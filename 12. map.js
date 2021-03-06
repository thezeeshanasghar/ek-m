onDeviceReady();

$(".search-btn").click(function () {

  $(this).css("display", "none");
  $(".map-confirm-btn").css("display", "none");
  $(".header_heading").css("display", "none");
  $(".search-filter-map").css("display", "block");
  $(".search-txt").focus();

});

$(".search-txt").focusout(function () {

  $(".search-btn").css("display", "block");
  $(".map-confirm-btn").css("display", "block");
  $(".header_heading").css("display", "block");
  $(".search-filter-map").css("display", "none");
});

var map;
var marker
var latitude = 33.689;
var longitude = 73.0479;
// initMap();
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: latitude, lng: longitude },
    zoom: 15,
    // gestureHandling: 'greedy',
    draggable: true
  });
  marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: { lat: latitude, lng: longitude },
    //gestureHandling: 'greedy',
    icon:"img/user location.ico",
    draggable: true,
    map: map,
  });
  // map.addObject(marker);
  marker.addListener('click', toggleBounce);
  this.map.setCenter(this.marker.position);

  this.marker.setMap(this.map);

  google.maps.event.addListener(this.marker, "dragend", function (evt) {
    latitude = evt.latLng.lat().toFixed(3);
    longitude = evt.latLng.lng().toFixed(3);
    console.log(latitude);
    console.log(longitude);
  });
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function onDeviceReady() {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
//
function onSuccess(position) {
  window.alert("location detected");
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log(latitude);
    console.log(longitude);
  initMap();
}

// onError Callback receives a PositionError object
//
function onError(error) {
  alert('code: ' + error.code + '\n' +
    'message: ' + error.message + '\n');
}

function GetCity() {


  $.ajax({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyCR_2FL_BNSWlQlilxNS5nr6-VdeadiL9Q',
    // url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=30.059416,70.638570&key=AIzaSyCR_2FL_BNSWlQlilxNS5nr6-VdeadiL9Q',
    type: "GET",
    dataType: "JSON",
    // crossOrigin: null,
    contentType: "application/json;charset=utf-8",
    success: function (result) {
      window.alert("city detected");
      var city;
      var results = result.results;
      for (var i = 0; i < results[0].address_components.length; i++) {
        for (var b = 0; b < results[0].address_components[i].types.length; b++) {

          //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
          if (results[0].address_components[i].types[b] == "administrative_area_level_2") {
            city = results[0].address_components[i];
            break;
          }
        }
      }
      //city data
      window.alert(city.short_name);
      CityName = city.short_name;
      //  var CityName = result.results[0].address_components.filter(ac=>~ac.types.indexOf('locality'))[0].long_name;
      //   window.alert("City Name "+CityName);
      GetCityId(CityName);
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
    }
  });
}
function GetCityId(name) {
  $.ajax({
    url: SERVER + 'city/name/' + name,
    type: "GET",
    dataType: "JSON",
    contentType: "application/json;charset=utf-8",
    success: function (result) {
      console.log(result.Id)
      result=result.filter(x=>x.Status==1);
      if(result)
      {
           window.alert("city Found In database");
      localStorage.setItem("CityId", result.Id);
      window.location.href = "16. selected-location.html";
      }else{

        window.alert("Sorry Our Service is Not Available here");
        window.location.href = '13. na-location.html'
        console.log(xhr.responseText);
      }
   
    },
    error: function (xhr, status, error) {
      window.alert("Sorry Our Service is Not Available here");
      window.location.href = '13. na-location.html'
      console.log(xhr.responseText);
    }
  });
}

function GetRestaurantLocations() {
  localStorage.setItem('lat' , latitude);
  localStorage.setItem('lng' , longitude);
  var restaurant = 0;
  $.ajax({
    url: SERVER + 'RestaurantLocation',
    type: "GET",
    dataType: "JSON",
    contentType: "application/json;charset=utf-8",
    success: function (result) {
      console.log(result)
      if (result) {
        $.each(result, function (index, location) {
          var distance = getDistanceFromLatLonInKm(latitude, longitude, location.Latitude, location.Longitude);
          console.log(distance);
          if (distance < result[index].DelRadius)
            restaurant++;
        });
      }
      if (restaurant > 0)
      {
        console.log("success");
        window.location.href="16. selected-location.html"
      }
      else
      {
        console.log("no service");
        window.alert("sorry our service is not available here");
      }

    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
    }
  });
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

