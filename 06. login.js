$(document).ready(function () {

    
});
$("#login-form").validate({
    rules: {
        Email: {
            required: function (element) {
                return $("#Email").is(':blank');
            }
        },
        Password: {
            required: function (element) {
                return $("#Password").is(':blank');
            }
        }
    },

    messages: {
        Email: {
            required: 'Email is Required'
        },
        Password: {
            required: 'Password is Required'
        }
    },
    errorElement: 'span',
    errorClass: "validate-has-error",
    validClass: '',
    highlight: function (element, errorClass, validClass) {
        console.log(element,errorClass);
        $(element).parents("div.form-group").addClass(errorClass).removeClass(validClass);
    },
    unhighlight: function (element, errorClass, validClass) {
        console.log(element,errorClass);
        $(element).parents("div.form-group").removeClass(errorClass).addClass(validClass);
    },
     //Form Processing via AJAX
    submitHandler: function (form) {
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
            beforeSend:function(){
                $('#loading').removeClass("d-none");
            },
            success: function (result) {
              console.log(result);
              debugger;
              if(result)
              {
                if(result.UserAuthentication[0].IsVerified==1)
                {
                  localStorage.setItem("Customer", JSON.stringify(result));
                    // $(".login-overlay").fadeOut();
                    // toggleLogInOut();
                    // toggleProfileAndOrders();
                    window.open("01. starting-page.html","_self");  
                }else{

                    localStorage.setItem("CustomerId", result.Id);
                    window.location.href = "09. verify-pswd.html";
                }
              }
                 
            },
            error: function (xhr, status, error) 
            {
                var resp=JSON.parse(xhr.responseText);

                alert(resp.message);
            },
            complete:function()
            {
                $('#loading').addClass("d-none");
            }
        });
    }
});

