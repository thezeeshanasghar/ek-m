var FilterURL = '';
var CuisineId ;
var open = 0;
var topr = 0;
// var CityId = getObjsFromLocalStorage("CityId"); 
var lat = getObjsFromLocalStorage("lat");
var lng = getObjsFromLocalStorage("lng");
$(document).ready(function(){
    loadCuisine();
    // loadSpon();
      loadRest();
      searchRest();
      searchstickRest();
      var Customer = getObjsFromLocalStorage("Customer");
    var UserName = 'Hello ' +Customer.Name+ '!' ;
    $("#UserName").html(UserName);
    $("#logout").on('click', function () {
        localStorage.clear();
        window.location.href = '06. login.html';
    });

    $(".select-location-header img").click(function(){
        $(".edit-back").fadeIn();
        console.log("working")
    });

    $(".edit-back").click(function(){
        $(this).fadeOut();
    });

    $(".filter-btn").click(function(){
        $(".filter-popup").fadeIn();
    });

    $(".filter-close").click(function(){
        $(".filter-popup").fadeOut();
    });
});

// Load Cuisines
function loadCuisine() {

    $.ajax({
        url: SERVER + "cuisine",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {

        	console.log(result);
            var html='';
			
             if(result) {
                $.each(result, function(index,cuis){

                	console.log(cuis.Id %4);

                	var id = cuis.Id %4;

                	var cls;

                	if(id == 1)
                		cls = 'one';
                	else if (id==2)
                		cls = 'two';
                	else if (id==3)
                		cls = 'three';
                	else if (id==0)
                		cls = "four";

                    html += '<div class="swiper-slide swiper-slide-widthed-sm">';
                    html += '<a onclick="setCuisineId('+cuis.Id+');" href="#" class="'+cls+'">'+cuis.Name+'</a>';
                    html += '</div>';

                 
                }); 
                $("#cuisines").html(html);

                 if ($(window).width() > 559) {

                    var swiper = new Swiper('.s1', {
                      slidesPerView: 6,
                      spaceBetween: 1,
                      freeMode: true,
                    });

                } else {

                    var swiper = new Swiper('.s1', {
                      slidesPerView: 4,
                      spaceBetween: 50,
                      freeMode: true,
                    });

                }

                
            }
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
        }
    });


    
}


// Load Restaurants
function loadRest() {

    $.ajax({
      //  url: SERVER + "restaurant/city/"+cityid+"?"+ FilterURL,
      url: SERVER + "restaurant/"+lat+"/"+lng + "?"+ FilterURL,
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            result=result.filter(x=>x.Status==1);
        	console.log(result);
            var spohtml='';
            var html='';
             if(result) {
                $.each(result, function(index,rest){
         // for sponsor Restaurant
                if (rest.IsSponsor)
                {
                    spohtml += '<div class="swiper-slide swiper-slide-widthed">';
                    // html += '<a href="19. view-order.html?id='+spon.Id+'">';
                    spohtml += '<div class="restaurants-slides">';
                    spohtml += '<div class="rest-photo">';
                    spohtml += '<div class="img">';
                    spohtml += '<img src="'+IP+":"+PORT+"/"+rest.CoverImagePath+'" /></div>';
                    spohtml += '<span class="status">open</span>';
                    spohtml += '<span class="distance">Approximately <br><b>'+rest.approximateTime+' Min</b></span>';
                    spohtml += '</div>';
                    spohtml += '<div class="rest-info">';
                    spohtml += '<h4>'+ rest.Name +'</h4>';
                    spohtml += '<p><span><img src="img/star.jpg"/>'+rest.Rating;
                    spohtml += '</span>('+rest.reviewCount+'+) - Pizza - Burger - Peri...</p>';
                    spohtml += '</div></div></div>';
                }
        
        // For All Restaurants
                    html += '<div class="rest-slider">';
                    html += '<a href="19. view-order.html?id='+rest.Id+'">';
                    html += '<div class="all-rest-item rest-item">';
                    html += '<div class="rest-photo">';
                    html += '<div class="img"><img src="'+IP+":"+PORT+"/"+rest.CoverImagePath+'" /></div>';
                    html += '<span class="distance">Approximately<br><b>'+rest.approximateTime+' Min</b></span>';
                    html += '</div>';
                    html += '<div class="rest-info">';
                    html += '<h4>'+rest.Name+'</h4>';
                    html += '<p><span><img src="img/star.jpg" />'+rest.Rating+' Good</span>('+rest.reviewCount+'+) - BBQ - Chinese - Pak...</p>';
                    html += '</div></div></a></div>';
                }); 
                $("#spon-rest").html(spohtml);
                var swiper = new Swiper('.s2', {
                    slidesPerView: 'auto',
                    spaceBetween: 14,
                    freeMode: true,
                  });
                $("#all-rest").html(html);
            }
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
          }
    });
}


function searchRest() {

    $("#search").keyup(function(){
        $("#liveSearch").html('');
        var searchField = $("#search").val();
        var expression = new RegExp(searchField, "i");

         $.ajax({
        url: SERVER + "restaurant",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            
            $.each(data, function(key, value){

                if (value.Name.search(expression) != -1 || value.LogoImagePath.search(expression) != -1)

                {
                    $("#liveSearch").append('<li data-value='+value.Id+' ><img src="'+IP+":"+PORT+"/"+value.LogoImagePath+'" /> | '+value.Name+'</li>');
                }
            
                $("#liveSearch").on('click', 'li' , function(){
                    var click_text = $(this).text().split('|');

                    // alert(click_text);
                    var Id = $(this).attr("data-value");
                    $("#search").val($.trim(click_text))
                    $("#liveSearch").html('');
                    window.location.href="19. view-order.html?id="+Id;
                });
            })


            
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
          }
    });


    })

}

function searchstickRest() {

    $("#stick-search").keyup(function(){
        $("#livestickSearch").html('');
        var searchField = $("#stick-search").val();
        var expression = new RegExp(searchField, "i");

         $.ajax({
        url: SERVER + "restaurant",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            
            $.each(data, function(key, value){

                if (value.Name.search(expression) != -1 || value.LogoImagePath.search(expression) != -1)

                {
                    $("#livestickSearch").append('<li><img src="'+IP+":"+PORT+"/"+value.LogoImagePath+'" /> | '+value.Name+'</li>');
                } 

                $("#livestickSearch").on('click', 'li' , function(){
                    var click_text = $(this).text().split('|');

                    // alert(click_text);

                    $("#stick-search").val($.trim(click_text))
                    $("#livestickSearch").html('');
                });
            })


            
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
          }
    });


    })

}
function setCuisineId(id)
{
    FilterURL = 'cuisineId='+id;
    loadRest();
}
function setOpen(){
if (open ==1)
 open = 0 ;
 else 
 open = 1 ;
 console.log(open);
 }
 function setTop(){
    if (topr == 1)
    topr = 0;
    else
    topr = 1 ;
    console.log(topr);
}
function ApplyFilters()
{
    FilterURL = ''; 
    $(".filter-popup").fadeOut();
    if (open = 1)
    {
        FilterURL += 'open=true';
        if (topr = 1)
        {
            FilterURL += '&top=true';
        }
    }
    else if (topr = 1)
    {
        FilterURL += 'top=true';
    }
    loadRest();
}

function clearFilters()
{
 open = 0;
 top = 0;
 FilterURL = ''; 
 loadRest(); 
 $(".filter-popup").fadeOut();
 $(".filter-opt input").prop("checked", false );
}