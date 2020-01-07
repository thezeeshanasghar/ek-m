$(document).ready(function () {

    var grandT = localStorage.getItem('grandTotal');
    $("#orderAmount").html("Rs " + grandT);
    var payMode = localStorage.getItem('PayMethod');
    $("#payMode").html(payMode);
    if (!payMode) $("#payMode").html("Cash");
    var orderId = localStorage.getItem('orderId');
    $("#orderId").html(orderId);

});