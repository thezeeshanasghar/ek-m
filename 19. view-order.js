$(document).ready(function(){

   var id = parseInt(getParameterByName("id")) || 0;
    localStorage.setItem("RestaurantId", id);
  restBanner(id);
  loadRestaurantDetails(id);
 animatedMenu();


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

function loadRestaurantDetails(restaurantId) {

    $.ajax({
        url: SERVER + "restaurant/" + restaurantId + "/restaurant-details",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            var navList = '';
            var html = '';
           
                var restaurant = result;
                localStorage.setItem("DelCharges", restaurant.DelCharges);
                
                // Restaurant Menus
                $.each(restaurant.RestaurantMenus, function (index, menu) {

                  navList += '<li>';
                  navList += '<a class="scrollTo" href="#'+menu.Name+'">'+menu.Name+'</a>';
                  navList += '</li>';


                  html += '<div class="order-list">';
                  html += '<div class="order-list-heading">';
                  html += '<h1 id="'+menu.Name+'">'+menu.Name+'</h1>';
                  html += '</div>';
                  html += '<ul>';


                  $.each(menu.MenuItems , function (index, subMenu) {


                    html += '<li>';
                    html += '<div class="selected-order"><img src="img/selected-order.jpg" /></div>';
                    html += '<h2><span>3x </span>'+subMenu.Name+'</h2>';
                    html += '<div class="left-panel"><p>Small 250, Medium 500, Large 800</p></div>';
                    html += '<div class="right-panel"><img src="img/plus-round-green.jpg" /></div>';
                    html += '</li>';
                    

                  });

                  html += '</ul>';
                  html += '</div>';



                });

                $(".order-nav ul").html(navList);
                $(".order-list-page").append(html);


                $("#order-nav a").click(function () {

                    $("#order-nav a").removeClass("active");
                    // $(".tab").addClass("active"); // instead of this do the below 
                    $(this).addClass("active");   
                });

                $('.scrollTo').click(function(){

                var getElement = $(this).attr('href');
                if($(getElement).length){
                    var getOffset = $(getElement).offset().top;
                    $('html,body').animate({
                        scrollTop: getOffset - 100
                    }, 500);
                }

            });


            
            // } else {
            //     alert(result.Message);
            // }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

function animatedMenu() {

  $("#order-nav a").click(function () {
    console.log("clicked")
                    $("#order-nav a").removeClass("active");
                    // $(".tab").addClass("active"); // instead of this do the below 
                    $(this).addClass("active");   
                });

                $('.scrollTo').click(function(){

                var getElement = $(this).attr('href');
                if($(getElement).length){
                    var getOffset = $(getElement).offset().top;
                    $('html,body').animate({
                        scrollTop: getOffset - 100
                    }, 500);
                }

            });

}