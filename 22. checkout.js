var items = getObjsFromLocalStorage("items");
var CityId = getObjsFromLocalStorage("CityId");
var RestaurantId = getObjsFromLocalStorage("RestaurantId");
var DelCharges = getObjsFromLocalStorage("DelCharges");
$(document).ready(function () {
    var grandT = localStorage.getItem('grand');
    $(".checkout-amount").html("Rs " + grandT);

    $("#placeOrder").click(function(){

    	var orderId = Math.floor(100000 + Math.random() * 900000);
    	localStorage.setItem("orderId" , orderId)

    });
});
function checkout() {
    if (isLoggedIn()) {
        var customer = getObjsFromLocalStorage("Customer");
        for (var i = 0; i <= items.length - 1; i++) {
            delete items[i].Id; 
            if (items[i].Quantity === 0) {
                delete items[i]; 
                items.length--;

            }
        }
        
        // if (extraitems != null)
        // for (var i = 0; i <= extraitems.length - 1; i++) {
        //     delete extraitems[i].Id; 
        //     if (extraitems[i].Quantity === 0) {
        //         delete extraitems[i]; 
        //         extraitems.length--;

        //     }
        // }
        if (items && items.length > 0) {
            var allItems = [];
            // if (extraitems != null){
            // allItems = items.concat(extraitems);
            // }
            // else 
            {allItems = items}
            console.log (allItems);
            var order = {
                Subtotal: $("#subtotal").val(),
                GrandTotal: $("#grandTotal").val(),
                Fee: $("#DelCharges").val(),
                GST: $("#GST").val(),
                OrderItems : allItems,
                CustomerId: customer.Id,
                CityId : CityId,
                RestaurantId: RestaurantId 
            }
            $.ajax({
                url: SERVER + "order/customer-order",
                type: "POST",
                data: JSON.stringify(order),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (result) {
                        alert("Your order is placed successfully");
                        localStorage.removeItem("items");
                        //localStorage.removeItem("extraitems");
                        toggleCart();
                        window.location.reload(true);
                        location.href = 'order-placed.html';
                }
            });
        } else {
            alert("Cart is empty");
        }
    } else {
        alert('Please login first');
    }

}
