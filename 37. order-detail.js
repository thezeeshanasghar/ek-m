
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
                       console.log(result);
                       
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
                      result.OrderStatus !=3?$("#Reorder").css("display","none"):$("#Reorder").css("display","block");

                    },
                    error: function(xhr, status, error) {
                        console.log(xhr.responseText);
                      }
                });
            }
            function ReOrder(){
              $.ajax({
                  url: SERVER + "order/" +OrderId,
                  type: "GET",
                  dataType: "JSON",
                  contentType: "application/json;charset=utf-8",
                  success: function (result) {
                      localStorage.setItem('grandTotal' , result.GrandTotal);
                      localStorage.setItem('PayMethod' , result.PayMethod);
                      console.log(result);
                      var order = {
                          Subtotal: result.Subtotal,
                          GrandTotal: result.GrandTotal,
                          Fee: result.Fee,
                          GST: result.GST,
                          Address: result.Address,
                          PayMethod: result.PayMethod,
                          Instruction:result.Instruction,
                          OrderItems : result.OrderItems,
                          CustomerId: result.CustomerId,
                          CityId : result.CityId,
                          RestaurantId: result.RestaurantId 
                      }
                      $.ajax({
                          url: SERVER + "order/customer-order",
                          type: "POST",
                          data: JSON.stringify(order),
                          dataType: "json",
                          contentType: "application/json;charset=utf-8",
                          success: function (result) {
                                  localStorage.setItem("Id" , result.Id)
                                  alert("Your order is placed successfully");
                                  localStorage.removeItem("items");
                                  window.location.reload(true);
                                  location.href = '23. order-placed.html';
                          }
                      });
                  },
                  error: function(xhr, status, error) {
                      console.log(xhr.responseText);
                    }
              });
          
          }