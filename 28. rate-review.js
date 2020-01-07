var RestaurantId = getObjsFromLocalStorage("RestaurantId");
var Customer = getObjsFromLocalStorage("Customer");

    var starRate = "";

    $("#star1").click(function(){
        starRate = 5;
        console.log(starRate);
    });

    $("#star2").click(function(){
        starRate = 4;
        console.log(starRate);
    });

    $("#star3").click(function(){
        starRate = 3;
        console.log(starRate);
    });

    $("#star4").click(function(){
        starRate = 2;
        console.log(starRate);
    });

    $("#star5").click(function(){
        starRate = 1;
        console.log(starRate);
    });

function postReview() {




    obj = {
        "Rating": starRate,
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