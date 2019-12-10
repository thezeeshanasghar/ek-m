var extraitems = [];
var items = getObjsFromLocalStorage("items");
var CityId = getObjsFromLocalStorage("CityId");
var RestaurantId = getObjsFromLocalStorage("RestaurantId");
var DelCharges = getObjsFromLocalStorage("DelCharges");
$(document).ready(function () {
    loadOrderItems();
});
function loadOrderItems() {

    if (items && items.length >= 0) {
        var html = '';
        $.each(items, function (index, item) {
            console.log(item.Name);

            html += '<div class="customize-panel">';
            html += '<h4>'+item.Name+'</h4>';
            html += '<div class="customize-opt">';
            html += '<ul>';
            html += '<div class="left-panel"><li>'+item.Size+'</li>';
            html += '<li>';
            html += '<div class="quantity">';
            html += '<span role="button" onclick="minusQuantity('+item.Id+', '+item.Price+', '+item.Quantity+') class="customize-minus"><img class="minus" src="img/custom-minus.jpg"></span>';
            html += '<span class="customize-quantity">'+item.Quantity+'</span>';
            html += '<span role="button" onclick="plusQuantity('+item.Id+', '+item.Price+', '+item.Quantity+') class="customize-plus"><img class="plus" src="img/custom-plus.jpg"></span>';
            html += '</div>';
            html += '</li>';
            html += '</div>';
            html += '<div class="right-panel">';
            html += '<li class="rs"><h5>Rs '+item.Price+'<span>'+item.Price+'</span></li>';
            html += '<li class="custom-radio">';
            html += '<div class="checkbox"><input class="toCheck" id="'+item.Name+''+item.Id+'" type="checkbox">';
            html += '<label for="'+item.Name+''+item.Id+'"></label></div></li>';
            html += '</div>';
            html += '</ul>';
            html += '</div>';
            html += '<div class="green-border"></div>';
            html += '</div>';
        });
        $("#customize-panel").html(html);
        calculateOrderTotals();

        $(".toCheck").click(function(){
                
                if ($(this).prop('checked') == true) {

                    var topDiv = $(this).parentsUntil(".customize-opt");

                    var control = $(topDiv).find(".quantity");
                  
                    $ (control).css('display' , 'block');


                }

                else if($(this).prop("checked") == false) {
                    $ (control).css('display' , 'none');
                }

            });


            $(".toCheck").click(function(){
                
                if ($(this).prop('checked') == false) {

                    var topDiv = $(this).parentsUntil(".customize-opt");

                    var control = $(topDiv).find(".quantity");
                  
                    $ (control).css('display' , 'none');


                }

                else if($(this).prop("checked") == true) {
                    $ (control).css('display' , 'block');
                }

            });
    }
}

function minusQuantity(itemId, price, quantity) {
    if (quantity > 0) {
        quantity = quantity - 1;
        let total = calculateTotal(price, quantity);
        changeItemValues(itemId, quantity, total);
    }
}



function plusQuantity(itemId, price, quantity) {
    quantity = quantity + 1;
    let total = calculateTotal(price, quantity);
    changeItemValues(itemId, quantity, total)
}

function calculateTotal(price, quantity) {
    return price * quantity;
    var sub = price * quantity;
    localStorage.setItem('total', sub);

}

function changeItemValues(itemId, quantity, total) {
    $.each(items, function (i, value) {
        if (value.Id == itemId) {
            items[i].Quantity = quantity;
            items[i].Total = total;
        }
    });
    loadOrderItems();
}

function deleteItem (i)
{
    console.log (items[i]);
   items.splice(i , 1);
   localStorage.setItem('items', JSON.stringify(items));
  loadOrderItems(); toggleCart();

}

function calculateOrderTotals() {
    
    let itemsubtotal = 0;
    let exitemsubtotal = 0;
    let subtotal = 0;
    let grandTotal = 0;
    let GST = 0;
    let fee = DelCharges;
    $.each(items, function (i, value) {
        itemsubtotal = itemsubtotal + value.Total;
    });

    // $.each(extraitems, function (i, value) {
    //     exitemsubtotal = exitemsubtotal + value.Total;
    // });

    //subtotal = itemsubtotal + exitemsubtotal ;
    subtotal = itemsubtotal ;
    GST = Math.round((15/100)*subtotal);

    grandTotal = subtotal + fee + GST; // TODO: using gst and fee to cal grandtotal

    roundtotal = Math.round(grandTotal);
    console.log(subtotal);
    $("#subtotal").html(subtotal);
   // $("#GST").val(GST);
    $("#DelCharges").html(DelCharges);
    $("#GST").html(GST);
    console.log(roundtotal)

    $("#grandTotal").html("Rs. " + roundtotal);
    localStorage.setItem('grand' , roundtotal)
}

