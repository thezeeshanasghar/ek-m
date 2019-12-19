var Id = getObjsFromLocalStorage("RestaurantId");
$(document).ready(function(){

   loadReviews(Id);
   
   
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
            html +='<h3>'+review.Customer.Name+'</h3><span>20 Mar, 2019</span></div></div><div class="right-panel"><img src="img/small-stars.jpg" alt=""></div>'
            html+='<p>'+review.Comment+'</p></div></li>'
          $("#userReview").html(html);  
        });
                
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}