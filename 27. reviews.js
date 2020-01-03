var Id = getObjsFromLocalStorage("RestaurantId");
localStorage.setItem("CityId", 1);    // temporary set
var items = [];
var items = getObjsFromLocalStorage("items");
var CityId = getObjsFromLocalStorage("CityId");
var DelCharges = getObjsFromLocalStorage("DelCharges");
$(document).ready(function(){
   loadReviews(Id);
    //var id = parseInt(getParameterByName("id")) || 0;
    //localStorage.setItem("RestaurantId", id);
    restBanner(Id);
   $(window).scroll(function(){

    var sticky = $('.order-sticky'),
    scroll = $(window).scrollTop();

    if (scroll >= 234) sticky.slideDown();
    else sticky.slideUp();

});

$(window).scroll(function(){

    var stickyHeading = $('.order-list-heading'),
    scroll = $(window).scrollTop();

    if (scroll >= 234) stickyHeading.slideDown();
    else stickyHeading.slideUp();

});

restStarRating(Id)

 });



function restStarRating(restaurantId){

     $.ajax({
        url: SERVER + "restaurant/" + restaurantId,
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {

             function restRating(){
                    var restaurant = result;
                    var restRating = restaurant.Rating;
                    // var rrestRating = 4;

                    console.log(restRating)

                    if (restRating <= 1) {
                        $("#rest-star5").addClass('checked');
                    }

                    else if (restRating <= 2) {
                        $("#rest-star4").addClass('checked');
                    }

                    else if (restRating <= 3) {
                        $("#rest-star3").addClass('checked');
                    }

                    else if (restRating <= 4) {
                        $("#rest-star2").addClass('checked');
                    }

                    else if (restRating <= 5) {
                        $("#rest-star1").addClass('checked');
                    }
                }

             restRating();
           
          
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });

}



function restBanner(id) {

    $.ajax({
        url: SERVER + "restaurant/" + id,
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {

          var stickyHeading = '';

          stickyHeading += '<img src="img/round_left_arrow.jpg" />' + result.Name;

            var path = result.CoverImagePath;
            var path2 = path.replace(/\\/g, "/");
            console.log(path2);
            
        $("#rest-banner").css("background-image","url('"+IP+":"+PORT+"/"+path2+"')");
        $(".rest-name-star-head h1").text(result.Name);
        $(".header_heading").html(stickyHeading);

                
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}
 

function loadReviews(id) {

    $.ajax({
        url: SERVER + "review/restaurant/" + id,
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
        var html = '';
        $.each(result, function (index, review) {
            console.log(review.Customer.Name);

            html += '<li><div class="header-wrapper"><div class="left-panel"><div class="user-icon"><img src="img/user-dark.jpg" alt=""></div><div class="user-name-date">'
            html +='<h3>'+review.Customer.Name+'</h3><span>'+review.Created+'</span></div></div>'
            html +='<div class="right-panel">'
            html +='<div class="cust-rate">'
            html +='<span name="star" class="" id="rest-star'+review.Customer.Id+1+'"></span><label for="rest-star'+review.Customer.Id+1+'"></label>'
            html +='<span name="star" class="" id="rest-star'+review.Customer.Id+2+'"></span><label for="rest-star'+review.Customer.Id+2+'"></label>'
            html +='<span name="star" class="" id="rest-star'+review.Customer.Id+3+'"></span><label for="rest-star'+review.Customer.Id+3+'"></label>'
            html +='<span name="star" class="" id="rest-star'+review.Customer.Id+4+'"></span><label for="rest-star'+review.Customer.Id+4+'"></label>'
            html +='<span name="star" class="" id="rest-star'+review.Customer.Id+5+'"></span><label for="rest-star'+review.Customer.Id+5+'"></label>'
            html +='</div></div>'
            html+='<p>'+review.Comment+'</p></div></li>'

            $("#userReview").html(html);

            var custRating = review.Rating;

            if (custRating <= 1) {
                $('#rest-star'+review.Customer.Id+5+'').addClass('checked');
            }

            else if (custRating <= 2) {
                $('#rest-star'+review.Customer.Id+4+'').addClass('checked');
            }

            else if (custRating <= 3) {
                $('#rest-star'+review.Customer.Id+3+'').addClass('checked');
            }

            else if (custRating <= 4) {
                $('#rest-star'+review.Customer.Id+2+'').addClass('checked');
            }

            else if (custRating <= 5) {
                $('#rest-star'+review.Customer.Id+1+'').addClass('checked');
            }
                
        });
                
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}