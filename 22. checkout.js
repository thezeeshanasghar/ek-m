$(document).ready(function () {
    var grandT = localStorage.getItem('grand');
    $(".checkout-amount").html("Rs " + grandT);

    $("#placeOrder").click(function(){

    	var orderId = Math.floor(100000 + Math.random() * 900000);
    	localStorage.setItem("orderId" , orderId)

    });
});

