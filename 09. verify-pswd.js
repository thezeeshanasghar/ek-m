function VerifyUser()
{
   var Id=localStorage.getItem("CustomerId");
    $.ajax({
        url: SERVER + "customer/VerifyCustomer/"+Id,
        type: "PUT",
        dataType: "json",
        data:{Code:$("#otpCode").val()},
        contentType: "application/json;charset=utf-8",
        beforeSend:function(){
            $('#loading').removeClass("d-none");
        },
        success: function (result) {
          console.log(result);
          if(result)
          {
              if(result.UserAuthentication[0].IsVerified==1)
              {
                localStorage.setItem("Customer", JSON.stringify(result));
                localStorage.removeItem("CustomerId");
                window.open("01. starting-page.html","_self"); 
              }else{
                  alert("Invalid Code");
              }
             
                // $(".login-overlay").fadeOut();
                // toggleLogInOut();
                // toggleProfileAndOrders();
                // window.open("01. starting-page.html","_self");  
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