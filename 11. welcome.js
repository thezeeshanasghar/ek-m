// var latitude = 33.6328987;
// var longitude = 72.9357134;
$(document).ready(function () {
    var customer = getObjsFromLocalStorage("Customer");
    $("#wellcomeName").html(customer.Name);
});

document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
//
function onSuccess(position) {
    var element = document.getElementById('geolocation');
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude ;
    GetCity(latitude , longitude);
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
function GetCity(lat , lng) {
    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyCR_2FL_BNSWlQlilxNS5nr6-VdeadiL9Q',
        type: "GET",
        dataType: "JSON",
        // crossOrigin: null,
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            console.log(result.results[5].address_components[0].long_name);
            var CityName = result.results[5].address_components[0].long_name;
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
        url: SERVER + 'city/'+name,
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            console.log(result.Id)
            localStorage.setItem("CityId", result.Id);
            window.location.href = "16. selected-location.html";
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
          }
    });  
}