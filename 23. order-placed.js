$(document).ready(function () {
    var grandT = localStorage.getItem('grand');
    $("#orderAmount").html("Rs " + grandT);

    var payMode = localStorage.getItem('payMode');
    $("#payMode").html(payMode);
    if (!payMode) $("#payMode").html("Cash");

    var orderId = localStorage.getItem('orderId');
    $("#orderId").html(orderId);

});