// $(document).ready(function () {

    
// });

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
          
               localStorage.setItem("Customer", JSON.stringify(result));
                // $(".login-overlay").fadeOut();
                // toggleLogInOut();
                // toggleProfileAndOrders();
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}
