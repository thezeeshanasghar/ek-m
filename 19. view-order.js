
localStorage.setItem("CityId", 1);    // temporary set
var items = [];
var items = getObjsFromLocalStorage("items");
var CityId = getObjsFromLocalStorage("CityId");
var RestaurantId = getObjsFromLocalStorage("RestaurantId");
var DelCharges = getObjsFromLocalStorage("DelCharges");
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

                  navList += '<div id="" class="swiper-slide">';
                  navList += '<a class="scrollTo" href="#'+menu.Name.split(" ").join("")+'">'+menu.Name+'</a>';
                  navList += '</div>';


                  html += '<div class="order-list">';
                  html += '<div class="order-list-heading">';
                  html += '<h1 id="'+menu.Name.split(" ").join("")+'">'+menu.Name+'</h1>';
                  html += '</div>';
                  html += '<ul>';


                  $.each(menu.MenuItems , function (index, menuItem) {


                    html += '<li>';
                    html += '<div class="selected-order"><img src="img/selected-order.jpg"/></div>';
                    html += '<h2>'+menuItem.Name+'</h2>';
                    html += '<div class="left-panel"><p>'+menuItem.Size+' Rs.'+menuItem.Price+'</p></div>';
                    //html += '<div class="left-panel"><p>Small 250, Medium 500, Large 800</p></div>';
                    html += '<div class="right-panel"><a role="button" tabindex="0"  onclick="addToCart('
                    + menuItem.Id + ',' + quoteAndEscape(menuItem.Name) +
                    ',' + quoteAndEscape(menuItem.Size) + ',' + menuItem.Price +
                    ')" style="cursor: pointer;"><img src="img/plus-round-white.jpg" /> </a> </div>';
                    html += '</li>';  

                  });

                  html += '</ul>';
                  html += '</div>';

                    



                });

                


                // Adding items in Div

                $(".orderNavList").html(navList);
                $(".order-list-page").append(html);


                // Scroll on click on header menu items
     
                $('.scrollTo').click(function(){

                    var getElement = $(this).attr('href');
                    if($(getElement).length){
                        var getOffset = $("h1"+getElement).offset().top;
                        $('html,body').animate({
                            scrollTop: getOffset - 100
                        }, 500);
                    }

                });


                // On Scroll Swiper Animate

                $(window).scroll(function(){


                    var sticky = $('.order-sticky'),
                    scroll = $(window).scrollTop();

                    if (scroll >= 271)  {

                        sticky.fadeIn();
                    
                    } else sticky.fadeOut();

                    var stickyHeading = $('.order-list-heading'),
                    scroll = $(window).scrollTop();

                    if (scroll >= 271) {

                        stickyHeading.fadeIn();

                    } else stickyHeading.fadeOut();





                    var scrollLink = $(".scrollTo");

                    
                    var scrollbarLocation = $(this).scrollTop();
                    // console.log(scrollbarLocation)

                    scrollLink.each(function(){

                        var sectionOffset = $(this.hash).offset().top - 150 ;

                        // console.log(sectionOffset)

                        if ( sectionOffset <= scrollbarLocation) {
                            $("#order-nav a").removeClass("active");
                            $(this).addClass("active");


                            var target = $(this).parent();

                            var swiper = new Swiper('.s4', {
                              slidesPerView: 'auto',
                              freeMode: true,
                              observer: true,
                              observeParents: false,


                            })
                            
                                // e.preventDefault();
                                swiper.slideTo( target.index(),false );
                                // console.log("Working");
                                var El = $('h1').attr('id');
                            // console.log(El)





                        }

                    })

                });


                // Add active on clicked

                $("#order-nav a").click(function (e) {

                    e.preventDefault();
                    $("#order-nav a").removeClass("active");
                    // $(".tab").addClass("active"); // instead of this do the below 
                    $(this).addClass("active");   
                });


                 // toggle function

                 (function($) {
                    $.fn.clickToggle = function(func1, func2) {
                        var funcs = [func1, func2];
                        this.data('toggleclicked', 0);
                        this.click(function() {
                            var data = $(this).data();
                            var tc = data.toggleclicked;
                            $.proxy(funcs[tc], this)();
                            data.toggleclicked = (tc + 1) % 2;
                        });
                        return this;
                    };
                }(jQuery));


                // Selecting Item     

                $('.order-list .right-panel img').clickToggle(function() {
                   

                        var parentLi = $(this).closest( "li" );
                        var selected = $(parentLi).find(".selected-order img");
                  
                        $ (selected).css('display' , 'block');


                        // Set to localStorage
                        // var parentDiv = $(this).parentsUntil("li");
                        // var paraText = $(parentDiv).find( "p" );
                        // var txt = $(paraText).html();

                        // console.log(txt);

                      //  localStorage.setItem("MenuItem", txt);
                        console.log("item added");

                        $(this).attr('src',"img/plus-round-green.jpg");

                }, function(i) {


                        var parentLi = $(this).closest( "li" );
                        var selected = $(parentLi).find(".selected-order img");
                        $ (selected).css('display' , 'none');
                        console.log("item Removed");
                        var items = getObjsFromLocalStorage("items");
                        console.log(items);
                        items.splice(0);
                        localStorage.setItem('items', JSON.stringify(items));
                        $(this).attr('src',"img/plus-round-white.jpg");
                        // function deleteItem (i)
                    
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
                    }, 1000);
                }

            });

}

// function getMenuSize(size) {
//     let sizeName = "";
//     switch (size) {
//         case 0:
//             sizeName = "Nothing";
//             break;
//         case 1:
//             sizeName = "Half";
//             break;
//         case 2:
//             sizeName = "Full";
//             break;
//         // default:
//         //     sizeName = "Default Size";
//     }
//     return sizeName;
//     }
function addToCart(id, name, size, price) {
    // if (isLoggedIn()) {
        items = getObjsFromLocalStorage("items");
        if (!items) items = [];
        let isExist = false;
        if (items.length > 0) {
            $.each(items, function (i, value) {
                if (value.Id == id) {
                    isExist = true;
                    return false;
                }
            });
        }
        if (!isExist) {
            var item = {
                Id: id,
                Name: name,
                Size: size,
                Price: price,
                Quantity: 1,
                Total: 0
            }
            item.Total = item.Price * item.Quantity;
          //  item.Size = getMenuSize(item.Size);
            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
            console.log(items);
        } else {
            alert('This item already added in your cart, please click items on right top corner!');
        }
    // } else {
    //     alert('Please login first');
    // }
}

function deleteItem (i)
{
    console.log (items[i]);
   items.splice(i , 1);
   localStorage.setItem('items', JSON.stringify(items));

}

