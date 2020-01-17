onDeviceReady();

$(".search-btn").click(function() { 

    $(this).css("display", "none"); 
    $(".map-confirm-btn").css("display", "none"); 
    $(".header_heading").css("display", "none");
    $(".search-filter-map").css("display", "block");
    $(".search-txt").focus();

}); 

$(".search-txt").focusout(function() { 

    $(".search-btn").css("display", "block"); 
    $(".map-confirm-btn").css("display", "block"); 
    $(".header_heading").css("display", "block");
    $(".search-filter-map").css("display", "none"); 

}); 

      var map;
      var marker
      var latitude =33.689;
      var longitude =73.0479;
     // initMap();
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: latitude, lng: longitude},
          zoom: 15,
         // gestureHandling: 'greedy',
          draggable: true
        });
        marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position: {lat: latitude, lng: longitude},
          //gestureHandling: 'greedy',
          draggable: true,
          map: map,
        });    
       // map.addObject(marker);
        marker.addListener('click', toggleBounce);
        this.map.setCenter(this.marker.position);
        this.marker.setMap(this.map);
    
        google.maps.event.addListener(this.marker, "dragend", function(evt) {
          latitude = evt.latLng.lat().toFixed(3);
          longitude = evt.latLng.lng().toFixed(3);
          console.log(latitude);
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
         longitude = position.coords.longitude ;
        initMap();
    }
    
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    function GetCity() {
      $.ajax({
           url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&key=AIzaSyCR_2FL_BNSWlQlilxNS5nr6-VdeadiL9Q',
          // url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=30.059416,70.638570&key=AIzaSyCR_2FL_BNSWlQlilxNS5nr6-VdeadiL9Q',
          type: "GET",
          dataType: "JSON",
          // crossOrigin: null,
          contentType: "application/json;charset=utf-8",
          success: function (result) {
              window.alert("city detected");
              var city;
              var results = result.results;
              for (var i=0; i<results[0].address_components.length; i++) {
                for (var b=0;b<results[0].address_components[i].types.length;b++) {
    
                //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                    if (results[0].address_components[i].types[b] == "administrative_area_level_2") {
                        city= results[0].address_components[i];
                        break;
                    }
                }
            }
            //city data
            window.alert(city.short_name );
            CityName = city.short_name;
            //  var CityName = result.results[0].address_components.filter(ac=>~ac.types.indexOf('locality'))[0].long_name;
            //   window.alert("City Name "+CityName);
               GetCityId(CityName);
          },
          error: function(xhr, status, error) {
              console.log(xhr.responseText);
            }
      });
  }
  function GetCityId(name)
  {
      $.ajax({                
          url: SERVER + 'city/name/'+name,
          type: "GET",
          dataType: "JSON",
          contentType: "application/json;charset=utf-8",
          success: function (result) {
              console.log(result.Id)
              window.alert("city Found In database");
              localStorage.setItem("CityId", result.Id);
              window.location.href = "16. selected-location.html";
          },
          error: function(xhr, status, error) {
            window.alert("Sorry Our Service is Not Available here");
            window.location.href='13. na-location.html'
              console.log(xhr.responseText);
            }
      });  
  }
    