
           $(document).ready( function(){

            var OrderId = 15;           //temporary Set 
             loadOrderById (OrderId);
            $(window).scroll(function(){
                var sticky = $('header'),
              scroll = $(window).scrollTop();
  
                if (scroll >= 90) sticky.addClass('fixed');
                else sticky.removeClass('fixed');
              });
              function loadOrderById(id)
              {
                  $.ajax({
                      url: SERVER + "order/" +id,
                      type: "GET",
                      dataType: "JSON",
                      contentType: "application/json;charset=utf-8",
                      success: function (result) {
                          var html = "" ;
                          
                         
                      },
                      error: function(xhr, status, error) {
                          console.log(xhr.responseText);
                        }
                  });
              }
            });


          