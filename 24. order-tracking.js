var OrderId = getObjsFromLocalStorage("Id");
$( document ).ready(function() {
    loadOrderStatus(OrderId);
    $(".order-con-1 .green-round").css('height' , '18px');
    function barDown(){
      $(".order-con-1 .green-bar").css('height' , '57px');  
   };
   window.setTimeout( barDown, 1700 ); // 3 seconds
   window.setInterval("loadOrderStatus(OrderId)", 10000);
});

function loadOrderStatus (id)
{
    $.ajax({
        url: SERVER + "order/" +id+"/status",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result ==1)
            {
            $(".order-con-2 .green-bar").css('height' , '57px');
            $(".order-con-2 .green-round").css('height' , '18px');
            }
            else if (result ==2)
            {
                // $(".order-con-2 .green-bar").css('height' , '57px');
                // $(".order-con-2 .green-round").css('height' , '18px');
                $(".order-con-2 .green-bar2").css('height' , '57px');
            }
            else if (result ==3)
            {
                $(".order-con-3 .green-bar").css('height' , '57px');
                $(".order-con-3 .green-round").css('height' , '18px');
            }
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
          }
    });
}