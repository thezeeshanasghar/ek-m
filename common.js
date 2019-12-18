$(document).ready(function () {
    /* Authentication */
    // toggleLogInOut();
    // selectCities();



    $(".logoutLi").on('click', function () {
        localStorage.clear();
        toggleLogInOut();
        location.reload(true);
    });
});

function login() {
    obj = {
        "Email": $("#Email").val(),
        "Password": $("#Password").val()
    }
    $.ajax({
        url: SERVER + "customer/login",
        type: "POST",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            // if (result.IsSuccess) {
               // localStorage.setItem("Customer", JSON.stringify(result.ResponseData));
               localStorage.setItem("Customer", JSON.stringify(result));
               window.location = "11. welcome.html"
                // $(".login-overlay").fadeOut();
                // toggleLogInOut();
                // toggleProfileAndOrders();
            // } else {
            //     alert(result.Message);
            // }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

function SignUp() {

    obj = {
        "Name": $("#name").val(),
        "Email": $("#email").val(),
        "Password": $("#password").val(),
        "MobileNumber": $("#mobNum").val(),
        "Address": $("#Address").val(),
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

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getValueFromLocalStorage(key) {
    var value = localStorage.getItem(key);
    return value;
}
function getObjsFromLocalStorage(key) {
    var value = JSON.parse(localStorage.getItem(key));
    return value;
}

function toggleLogInOut() {
    if (isLoggedIn()) {
        $(".logoutLi").show();
        $(".signupLi").hide();
        $(".loginLi").hide();
    } else {
        $(".loginLi").show();
        $(".signupLi").show();
        $(".logoutLi").hide();
    }
}

function isLoggedIn() {
    var customer = getObjsFromLocalStorage("Customer");
    if (customer) {
        return true;
    } else {
        return false;
    }
}



function quoteAndEscape(str) {
    return ''
        + '&#39;'                      // open quote '
        + ('' + str)                     // force string
            .replace(/\\/g, '\\\\')    // double \
            .replace(/"/g, '\\&quot;') // encode "
            .replace(/'/g, '\\&#39;')  // encode '
        + '&#39;';                     // close quote '
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