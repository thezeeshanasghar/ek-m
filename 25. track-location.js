var OrderId = getObjsFromLocalStorage("Id");
var cust_latitude=localStorage.getItem("lat");
var cust_longitude=localStorage.getItem("lng");
var RestaurantId=localStorage.getItem("RestaurantId");
var rest_latitude=0,rest_longitude=0;


$( document ).ready(function() {
    loadOrder(OrderId);
    loadOrderStatus (OrderId);
    window.setInterval("loadOrderStatus(OrderId)", 10000);
    setTimeout(function()
    {
      GetResturent(RestaurantId);
    },0)
});

function  GetResturent(RestaurantId)
{
    $.ajax({
       Type:"GET",
       dataType:"json",
       url:SERVER+ "RestaurantLocation/Restaurant/"+RestaurantId,
       success:function(response)
       {
          rest_latitude=response.Latitude;
          rest_longitude=response.Longitude;
          mapLocation();
          console.log(response);
       },
       error:function(response)
       {
           console.log(response);
       }
    })
}
function loadOrder (id)
{
    $.ajax({
        url: SERVER + "order/" +id,
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            $("#Address").html(result.Address);
            $(".right-panel").html(result.GrandTotal);
            loadRider(result.RiderId);
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
          }
    });
}

function loadRider (id)
{
    $.ajax({
        url: SERVER + "rider/" +id,
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            $("#riderName").html(result.Name);
        localStorage.setItem("RiderId",result.Id);
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
          }
    });
}

function loadOrderStatus (id)
{
    $.ajax({
        url: SERVER + "order/" +id+"/status",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
          
           if (result ==3)
            {
                window.location.href = "26. order-delivered.html"; 
            }
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
          }
    });
}

//New Changes
// var latitude,longitude;
// navigator.geolocation.getCurrentPosition(function(position) {
 
// latitude=position.coords.latitude;
// longitude=position.coords.longitude;

 
 function mapLocation() {
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;

  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
   
    
    var mapOptions = {
      zoom: 7,
      center: new google.maps.LatLng(30.3753, 69.3451)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
     calcRoute();
  }

  function calcRoute() {
    var start = new google.maps.LatLng(rest_latitude, rest_longitude);
    var end = new google.maps.LatLng(cust_latitude, cust_longitude);
    var Rest = new google.maps.Marker({icon: "img/rest.ico", map: map, position: start});
    var Customer = new google.maps.Marker({icon: "img/user.ico", map: map, position: end});
    var request = {
      origin: new google.maps.LatLng(rest_latitude, rest_longitude),
      destination: new google.maps.LatLng(cust_latitude,cust_longitude),
      travelMode: google.maps.TravelMode.DRIVING
    };
    marker = new google.maps.Marker();
    setInterval(function(){
      $.ajax({
        type:"GET",
        dataType:"json",
        url:SERVER+"Coordinates/"+OrderId,
        success:function(response)
        {
          var ridlat = parseFloat(response.RiderCoordinates.split(",")[0]);
          var ridlng = parseFloat(response.RiderCoordinates.split(",")[1]);
          marker.setPosition( new google.maps.LatLng(ridlat,ridlng));
          marker.setMap(map);

          var distance = getDistanceFromLatLonInKm(cust_latitude, cust_longitude, ridlat, ridlng);
          console.log(distance);
          $("#time").html(distance*3);

        },
        error:function(response)
        {

        }
      })
     
      
      
    },10000)
   
    // var request_1 = {
    //   origin: start,
    //   destination: end,
    //   travelMode: google.maps.TravelMode.DRIVING
    // };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap(map);
      } else {
        alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
      }
    });
    // directionsService_2.route(request_1, function(response, status) {
    //   if (status == google.maps.DirectionsStatus.OK) {
    //     directionsDisplay_2.setDirections(response);
    //     directionsDisplay_2.setMap(map);
    //   } else {
    //     alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
    //   }
    // });
  }
  initialize();
}

$('#loading').addClass("d-none"); 

// distance calculation for time
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

//});