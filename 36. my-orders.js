
$(document).ready(function () {
    var Customer = getObjsFromLocalStorage("Customer");
    $(window).scroll(function () {
        var sticky = $('header'),
            scroll = $(window).scrollTop();

        if (scroll >= 90) sticky.addClass('fixed');
        else sticky.removeClass('fixed');
    });

    loadCustomerOrders(Customer.Id);

    function loadCustomerOrders(customerId) {

        $.ajax({
            url: SERVER + "Customer/" + customerId + "/orders",
            type: "GET",
            dataType: "JSON",
            contentType: "application/json;charset=utf-8",
            success: function (result) {

                console.log(result);
                var status = ["Pending", "Active", "On The Way", "Delivered", "Cancel"];
                var Action = ["View Status", "ViewStatus", "Track Location", "ReOrder", "ReOrder"];
                var html = '';
                $.each(result, function (key, order) {
                    html += '<li><div class="header-wrapper"><div class="left-panel">';
                    html += ' <h4>Order ID #' + order.Id + '</h4><p>Order Amount, Rs.' + order.GrandTotal + '</p><p>' + order.Created + '</p></div>';
                    if (order.OrderStatus == 0 || order.OrderStatus == 1) {
                        html += '<div class="right-panel"><div class="order-status orange">' + status[order.OrderStatus] + '</div>';
                        html += ' <div class="order-action"><a onclick = "loadOrderDetails('+order.Id+');">Details</a><br><a href="24. order-tracking.html"> view status</a></div></div></div></li>';
                    }
                    else if (order.OrderStatus == 2) {
                        html += '<div class="right-panel"><div class="order-status blue">' + status[order.OrderStatus] + '</div>';
                        html += ' <div class="order-action"><a onclick = "loadOrderDetails('+order.Id+');">Details</a><br><a href="25. track-location.html">track location</a></div></div></div></li>';
                    }
                    else if (order.OrderStatus == 3) {
                        html += '<div class="right-panel"><div class="order-status green">' + status[order.OrderStatus] + '</div>';
                        html += ' <div class="order-action"><a onclick = "loadOrderDetails('+order.Id+');">Details</a><br><a href="37. my-orders.html" class="reorder">Reorder</a></div></div></div></li>';
                    }
                    else if (order.OrderStatus == 4) {
                        html += '<div class="right-panel"><div class="order-status red">' + status[order.OrderStatus] + '</div>';
                        html += ' <div class="order-action"><a onclick = "loadOrderDetails('+order.Id+');">Details</a><br><a href="37. my-orders.html" class="reorder">Reorder</a></div></div></div></li>';
                    }
                });
                $("#myOrders").html(html);

            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
            
        }); 
    }
});
function loadOrderDetails(id) 
{
  localStorage.setItem("OrderDetailsId" , id);
  window.location.href="37. order-detail.html";
}