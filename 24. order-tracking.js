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
                
            setTimeout('$(".order-con-2 .green-bar").css("height" , "57px");', 3000);
            // $(".order-con-2 .green-bar").css('height' , '57px');

            setTimeout('$(".order-con-2 .green-round").css("height" , "18px");', 4300);
            // $(".order-con-2 .green-round").css('height' , '18px');

            setTimeout('$(".order-con-2 .green-bar2").css("height" , "57px");', 5800);
            // $(".order-con-2 .green-bar2").css('height' , '57px');
            }
            else if (result ==2)
            {

                // setTimeout('$(".order-con-2 .green-bar").css("height" , "57px");', 7000);
        
                
                $(".order-con-2 .green-round").css('height' , '18px');
                $(".order-con-2 .green-bar2").css('height' , '57px');
                $(".order-con-3 .green-bar").css('height' , '57px');
                $(".order-con-3 .green-round").css('height' , '18px');
                $("#orderTrackBtn").attr("onclick" ,"window.location.href='25. track-location.html'");
                $("#orderTrackBtn").css("background-color", "#039611");
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

function orderTrack() {
    var tracker = 1;
    if (tracker == 1) {
        $("#orderTrackBtn").removeAttr("onclick");
        $("#orderTrackBtn").css("background-color", "#ddd");
        console.log("hello")

    } else if (tracker == 2) {
        $("#orderTrackBtn").addAttr("onclick" ,"window.location.href='25. track-location.html'");
        $("#orderTrackBtn").css("background-color", "#039611");
    }

}



