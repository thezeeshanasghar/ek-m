function GetActiveCoupon()
{
var UserDetail=JSON.parse(localStorage.getItem("Customer"));
console.log(UserDetail);
    $.ajax({
        url: SERVER + "CouponCode/ActiveCoupon",
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        beforeSend:function(){
            $('#loading').removeClass("d-none");
        },
        success: function (result) {
          console.log(result);
          var row="";
          for(var i=0;i< result.length;i++)
          {
              row+="<div class=\"update\">"
              row+="<div class=\"update-img\">"
              row+="<img src=\"img/banner.jpg\">"
              row+="</div>"
              row+="<div class=\"updateWrapper\">"
              row+="<div class=\"update-name\">"
              row+="hi "+UserDetail.Name
              row+="</div>"
            //   row+="<div class=\"update-time\">"
            //   row+= "12:00 AM, Jan 06, 2020"
            //   row+="</div>"
              row+="<div class=\"update-msg\">"
              row+=" Use this promo code and get "+result[i].PctDiscount+"% discount."
              row+=" </div>"
              row+="<div class=\"update-code-valid\">"
              row+="<div class=\"update-code\">"
              row+= result[i].Code
              row+="</div>" 
              row+=" <div class=\"update-valid\">"
              row+="Valid till "+result[i].ValidTill.split("T")[0]
              row+="</div>"   
              row+="</div>"
              row+="</div>"
              row+="</div>"

          }

          $(".update-wrapper").html(row);
        },error:function(resp)
        {
    
        }
    });
}
GetActiveCoupon();