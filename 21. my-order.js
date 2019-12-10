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

            html += '<ul><li>';
            html += '<div class="left-panel"><img src="img/minus-green-icon.jpg" alt="">';
            html += '<div class="order-name-price">';
            html +=   item.Name + ' (' + item.Size + ')<br>';
            html+= '<span>Rs'+item.Price+'</span>'; 
            html += '</div></div>';
            html += '<div class="right-panel"><img role="button" onclick="minusQuantity('+item.Id+', '+item.Price+', '+item.Quantity+')" src="img/minus-white-icon.jpg" alt="">';
            html+= '<span>'+item.Quantity+'</span>';
            html+= '<img role="button" onclick="plusQuantity('+item.Id+', '+item.Price+', '+item.Quantity+')" src="img/plus-white-icon.jpg" alt="">';
            html += '</div></li><ul>';
        });
        $("#itemValues").html(html);
        calculateOrderTotals();
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

