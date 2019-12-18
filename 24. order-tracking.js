var OrderId = getObjsFromLocalStorage("Id");
$( document ).ready(function() {
    loadOrder(OrderId);

    $(".order-con-1 .green-round").css('height' , '18px');
    

    function barDown(){
      $(".order-con-1 .green-bar").css('height' , '57px');
      
   };

   window.setTimeout( barDown, 1700 ); // 3 seconds
   

});

function loadOrder (id)
{
    $.ajax({
        url: SERVER + "order/" +id,
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            var html='';
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
          }
    });
}