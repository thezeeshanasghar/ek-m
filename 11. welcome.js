$(document).ready(function () {
    var customer = getObjsFromLocalStorage("Customer");
    $("#wellcomeName").html(customer.Name);
});