function VerifyNumber()
{
var Number=$("#Contact").val()
    $.ajax({
        url: SERVER + "customer/VerifyNumber/"+Number,
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend:function(){
            $('#loading').removeClass("d-none");
        },
        success: function (result) {
          console.log(result);
          if(result)
          {
            localStorage.setItem("CustomerId",result.Id);
            window.open("09. verify-pswd.html","_self");
          }
             
        },
        error: function (xhr, status, error) 
        {
            //var resp=JSON.parse(xhr.responseText);

           // alert(resp.message);
        alert("error")
        },
        complete:function()
        {
            $('#loading').addClass("d-none");
        }
 
    });
}