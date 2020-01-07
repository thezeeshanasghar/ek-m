var items = getObjsFromLocalStorage("items");
var CityId = getObjsFromLocalStorage("CityId");
var RestaurantId = getObjsFromLocalStorage("RestaurantId");
var DelCharges = getObjsFromLocalStorage("DelCharges");
var subtotal = getObjsFromLocalStorage("subtotal");
var grandTotal = getObjsFromLocalStorage("grandTotal");
var GST = getObjsFromLocalStorage("GST");
var paymentMethod ;

$(document).ready(function () {
    $(".checkout-amount").html("Rs " + grandTotal);

    $("#placeOrder").click(function(){

    	var orderId = Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem("orderId" , orderId)
    });
    $(".payment-mode").click(function(){
        $(".overlay").fadeIn('slow');
    });
    $(".select-opt label").click(function(){
        var $this = $(this);
        var value = $(this).find(".option");
        var pMethod = $(value).html();
          $("#mod-of-pay").html(pMethod);
          localStorage.setItem("PayMethod" , pMethod);

        if ($this.is(':nth-child(2)')) {
            paymentMethod = 0;
        } else if ($this.is(':nth-child(3)')) {
            paymentMethod = 1;
        } else if ($this.is(':nth-child(4)')) {
            paymentMethod = 2;
        } else if ($this.is(':nth-child(5)')) {
            paymentMethod = 3;
        }

    });
    $(".overlay").click(function(){
        $(this).css('display' , 'none');
    });

    
});
function checkout() {
   // if (isLoggedIn()) {
        var customer = getObjsFromLocalStorage("Customer");
        var items = getObjsFromLocalStorage("items");
        for (var i = 0; i <= items.length - 1; i++) {
            delete items[i].Id; 
            if (items[i].Quantity === 0) {
                delete items[i]; 
                items.length--;
            }
        }
        
        if (items && items.length > 0) {
            var allItems = [];
            {allItems = items}
            console.log (allItems);
            var order = {
                Subtotal: subtotal,
                GrandTotal: grandTotal,
                Fee: DelCharges,
                GST: GST,
                Address: $("#Address").val(),
                //PayMethod: $("#mod-of-pay").val(),
                PayMethod: paymentMethod,
                Instruction:$("#instructions").val(),
                OrderItems : allItems,
                CustomerId: customer.Id,
                CityId : CityId,
                RestaurantId: RestaurantId 
            }
            console.log(order);
            $.ajax({
                url: SERVER + "order/customer-order",
                type: "POST",
                data: JSON.stringify(order),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (result) {
                        localStorage.setItem("Id" , result.Id)
                        alert("Your order is placed successfully");
                        localStorage.removeItem("items");
                        //localStorage.removeItem("extraitems");
                        window.location.reload(true);
                        location.href = '23. order-placed.html';
                }
            });
        } else {
            alert("Cart is empty");
        }
  //  } else {
  //      alert('Please login first');
   // }

}
