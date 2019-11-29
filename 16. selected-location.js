$(document).ready(function(){
      loadCuisine();
      loadSpon();
      loadRest();
      searchRest();
      searchstickRest();
});

// Load Cuisines
function loadCuisine() {

    $.ajax({
        url: "http://localhost:3000/cuisines",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {

        	console.log(result);
            var html='';
			
             if(result) {
                $.each(result, function(index,cuis){

                	console.log(cuis.id %4);

                	var id = cuis.id %4;

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
                    html += '<a href="#" class="'+cls+'">'+cuis.title+'</a>';
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


// Load Sponsors
function loadSpon() {

    $.ajax({
        url: "http://localhost:3000/rest",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {

        	console.log(result);
            var html='';
			
             if(result) {
                $.each(result, function(index,spon){

                    html += '<div class="swiper-slide swiper-slide-widthed">';
                    html += '<div class="restaurants-slides">';
                    html += '<div class="rest-photo">';
                    html += '<div class="img"><img src="'+spon.imgPath+'" /></div>';
                    html += '<span class="status">open</span>';
                    html += '<span class="distance">Approximately <br><b>45 Min</b></span>';
                    html += '</div>';
                    html += '<div class="rest-info">';
                    html += '<h4>'+ spon.title +'</h4>';
                    html += '<p><span><img src="img/star.jpg"/>3.8 Good';
                    html += '</span>(20+) - Pizza - Burger - Peri...</p>';
                    html += '</div></div></div>';

                 
                }); 
                $("#spon-rest").html(html);

                var swiper = new Swiper('.s2', {
			      slidesPerView: 'auto',
			      spaceBetween: 14,
			      freeMode: true,
			    });
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
        url: "http://localhost:3000/rest",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) {

        	console.log(result);
            var html='';
			
             if(result) {
                $.each(result, function(index,rest){

                    html += '<div class="rest-slider">';
                    html += '<div class="all-rest-item rest-item">';
                    html += '<div class="rest-photo">';
                    html += '<div class="img"><img src="'+rest.imgPath+'" /></div>';
                    html += '<span class="distance">Approximately<br><b>30 Min</b></span>';
                    html += '</div>';
                    html += '<div class="rest-info">';
                    html += '<h4>'+rest.title+'</h4>';
                    html += '<p><span><img src="img/star.jpg" />4.2 Good</span>(40+) - BBQ - Chinese - Pak...</p>';
                    html += '</div></div></div>';
                    

                 
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
        url: "http://localhost:3000/rest",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            
            $.each(data, function(key, value){

                if (value.title.search(expression) != -1 || value.imgPath.search(expression) != -1)

                {
                    $("#liveSearch").append('<li><img src="'+value.imgPath+'" /> | '+value.title+'</li>');
                }

                $("#liveSearch").on('click', 'li' , function(){
                    var click_text = $(this).text().split('|');

                    // alert(click_text);

                    $("#search").val($.trim(click_text))
                    $("#liveSearch").html('');
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
        url: "http://localhost:3000/rest",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            
            $.each(data, function(key, value){

                if (value.title.search(expression) != -1 || value.imgPath.search(expression) != -1)

                {
                    $("#livestickSearch").append('<li><img src="'+value.imgPath+'" /> | '+value.title+'</li>');
                } 
            })


            
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
          }
    });


    })

}