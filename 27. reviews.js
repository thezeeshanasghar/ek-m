var Id = getObjsFromLocalStorage("RestaurantId");
var Customer=getObjsFromLocalStorage("Customer");
localStorage.setItem("CityId", 1);    // temporary set
var items = [];
var items = getObjsFromLocalStorage("items");
var CityId = getObjsFromLocalStorage("CityId");
var DelCharges = getObjsFromLocalStorage("DelCharges");
var IsReviewed=0
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
            console.log(review);
            if(review.Customer.Id==Customer.Id)
            {
                IsReviewed=1;
            }
            var star1 = review.Id+"a";
            var star2 = review.Id+"b";
            var star3 = review.Id+"c";
            var star4 = review.Id+"d";
            var star5 = review.Id+"e";
            // if(review.)

            html += '<li><div class="header-wrapper"><div class="left-panel"><div class="user-icon"><img src="img/user-dark.jpg" alt=""></div><div class="user-name-date">'
            html +='<h3>'+review.Customer.Name+'</h3><span>'+review.Created.split('T')[0]+'</span></div></div>'
            html +='<div class="right-panel">'
            html +='<div >'
            for(var i=0;i<review.Rating;i++)
            {
                html+="<span><img src=\"img/star.jpg\"></span>"

            }
            {/* html +='<span name="star" id='+star1+'></span><label for='+star1+'></label>'
            html +='<span name="star" id='+star2+'></span><label for='+star2+'></label>'
            html +='<span name="star" id='+star3+'></span><label for='+star3+'></label>'
            html +='<span name="star" id='+star4+'></span><label for='+star4+'></label>'
            html +='<span name="star" id='+star5+'></span><label for='+star5+'></label>' */}
            html +='</div></div>'
            html+='<p>'+review.Comment+'</p></div></li>'


            var custRating = review.Rating;

            // console.log(custRating)

            jstar1 = '#'+star1;
            jstar2 = '#'+star2;
            jstar3 = '#'+star3;
            jstar4 = '#'+star4;
            jstar5 = '#'+star5;

            if (custRating <= 1) {
                $(jstar5).addClass('checked');
                console.log("if else working")
            }

            else if (custRating <= 2) {
                $(jstar4).addClass('checked');
            }

            else if (custRating <= 3) {
                $(jstar3).addClass('checked');
            }

            else if (custRating <= 4) {
                $(jstar2).addClass('checked');
            }

            else if (custRating <= 5) {
                $(jstar1).addClass('checked');
            }
                
        });

            $("#userReview").html(html);



                
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

function Reviewclk()
{
    if(IsReviewed>0)
    {
        alert("Already Reviewed");
    }else{
window.open("28. rate-review.html","_self");
    }
}