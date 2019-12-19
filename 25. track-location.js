var OrderId = getObjsFromLocalStorage("Id");
$( document ).ready(function() {
    loadOrder(OrderId);
    loadOrderStatus (OrderId);
    window.setInterval("loadOrderStatus(OrderId)", 10000);

});

function loadOrder (id)
{
    $.ajax({
        url: SERVER + "order/" +id,
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            $("#Address").html(result.Address);
            $(".right-panel").html(result.GrandTotal);
            loadRider(result.RiderId);
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
          }
    });
}

function loadRider (id)
{
    $.ajax({
        url: SERVER + "rider/" +id,
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            $("#riderName").html(result.Name);
        
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
          }
    });
}

function loadOrderStatus (id)
{
    $.ajax({
        url: SERVER + "order/" +id+"/status",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
          
           if (result ==3)
            {
                window.location.href = "26. order-delivered.html"; 
            }
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
          }
    });
}