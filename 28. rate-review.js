var RestaurantId = getObjsFromLocalStorage("RestaurantId");
var Customer = getObjsFromLocalStorage("Customer");
function postReview() {

    obj = {
        "Rating": 4,
        "Comment": $("#comment").val(),
        "CustomerId": Customer.Id,
		"RestaurantId": RestaurantId,
    }
console.log (obj);
    $.ajax({
        url: SERVER + "review",
        type: "POST",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
               window.location.href = "16. selected-location.html";
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}    