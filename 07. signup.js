$(document).ready(function () {
    selectCities();
});

function SignUp() {

    obj = {
        "Name": $("#name").val(),
        "Email": $("#email").val(),
        "Password": $("#password").val(),
        "MobileNumber": $("#mobileNumber").val(),
        // "Address": $("#Address").val(),
        "CityId": $("#selectCities").val()
    }
console.log (obj);
    $.ajax({
        url: SERVER + "customer",
        type: "POST",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
               localStorage.setItem("Customer", JSON.stringify(result));
               location.reload();
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}    

function selectCities() {

    $.ajax({
        url: SERVER + "city",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            var html='';
            
             if(result) {
                $.each(result, function(index,city){
                    html += '<option selected hidden>Please Choose your city</option>';
                    html += '<option value='+city.Id+'>' + city.Name + '</option>';
                }); 
                $("#selectCities").html(html);
            }
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
          }
    });
}