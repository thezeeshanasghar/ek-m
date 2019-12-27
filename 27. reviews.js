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

 });



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
            html += '<li><div class="header-wrapper"><div class="left-panel"><div class="user-icon"><img src="img/user-dark.jpg" alt=""></div><div class="user-name-date">'
            html +='<h3>'+review.Customer.Name+'</h3><span>'+review.Created+'</span></div></div><div class="right-panel"><img src="img/small-stars.jpg" alt=""></div>'
            html+='<p>'+review.Comment+'</p></div></li>'
          $("#userReview").html(html);  
        });
                
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}