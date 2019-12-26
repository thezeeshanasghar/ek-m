
           $(document).ready( function(){

            var OrderId = getObjsFromLocalStorage("OrderDetailsId");
             loadOrderById (OrderId);
            $(window).scroll(function(){
                var sticky = $('header'),
              scroll = $(window).scrollTop();
  
                if (scroll >= 90) sticky.addClass('fixed');
                else sticky.removeClass('fixed');
              });
             
            });
            function loadOrderById(id)
            {
                $.ajax({
                    url: SERVER + "order/" +id,
                    type: "GET",
                    dataType: "JSON",
                    contentType: "application/json;charset=utf-8",
                    success: function (result) {
                       var html = '' ;
                       var summary = '';
                       $.each(result.OrderItems, function (index, item)
                       {
                      html+= ' <li><div class="left-panel">'+ item.Name+'</div><div class="mid-panel">'+item.Quantity+'</div>';

                      html+=' <div class="right-panel">Rs '+item.Price+'</div></li>'
                           
                       });
                      $("#itemValues").html(html);
                      $("#subTotal").html(result.Subtotal);
                      $("#DelCharges").html(result.Fee);
                      $("#GST").html(result.GST);
                      $("#Total").html(result.GrandTotal);
                       
                    },
                    error: function(xhr, status, error) {
                        console.log(xhr.responseText);
                      }
                });
            }