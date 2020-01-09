var extraitems = [];
var items = getObjsFromLocalStorage("items");
var CityId = getObjsFromLocalStorage("CityId");
var RestaurantId = getObjsFromLocalStorage("RestaurantId");
var DelCharges = getObjsFromLocalStorage("DelCharges");
var menuIds = getObjsFromLocalStorage("menuIds");
var CouponDiscount = 0 ;
var Discount = 0;
$(document).ready(function () {
    loadOrderItems();
    loadExtraItems();
});

function loadOrderItems() {

    if (items && items.length >= 0) {
        var html = '';
        $.each(items, function (index, item) {
            console.log(item.Name);

            html += '<ul><li>';
            html += '<div class="left-panel"><img src="img/minus-green-icon.jpg" onclick = deleteItem('+index+');alt="">';
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

   function loadExtraItems() {
     var html = '';
     $.each(menuIds, function (index, id) { 
        console.log(id);  
        $.ajax({
            url: SERVER + "menu/" + id + "/menuextraitem",
            type: "GET",
            dataType: "JSON",
            contentType: "application/json;charset=utf-8",
            success: function (result) { 
                console.log(result);  
                $.each(result, function (index, item) {
                    html +=  '<div class="swiper-slide"><div class="ext-item">';
                    html += ' <span class="ext-name">'+item.Name+'('+item.Size+')'+'</span> <span class="ext-price">Rs.'+item.Price+'</span>';
                    html+= '<span onclick = "addToCart('+item.Id+','+quoteAndEscape(item.Name)+','+quoteAndEscape(item.Size)+','+item.Price+')"; class="ext-add">+</span>';
                    html +=  '</div></div>';
                });
                $("#extras").html(html);
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });

    }); 
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

function deleteItem (i)
{
    console.log (items[i]);
   items.splice(i , 1);
   localStorage.setItem('items', JSON.stringify(items));
  loadOrderItems(); toggleCart();

}

function calculateTotal(price, quantity) {
    return price * quantity;
    // var sub = price * quantity;
    // localStorage.setItem('total', sub);
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
  loadOrderItems();

}

function calculateOrderTotals() {
    
    let itemsubtotal = 0;
  //  let exitemsubtotal = 0;
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
    console.log(CouponDiscount);
    if (CouponDiscount !=0 && CouponDiscount != null)
    {
    Discount = ((CouponDiscount/100)*itemsubtotal);
    subtotal = itemsubtotal-Discount ;
    }
    else 
    subtotal = itemsubtotal ;
    subtotal = Math.round(subtotal);
    console.log(subtotal);
    GST = Math.round((15/100)*subtotal);
    grandTotal = subtotal + fee + GST; // TODO: using gst and fee to cal grandtotal
    roundtotal = Math.round(grandTotal);
    $("#subtotal").val(subtotal);
    localStorage.setItem("subtotal" , subtotal);
    $("#DelCharges").val(DelCharges);
    localStorage.setItem("DelCharges" , DelCharges);
    $("#GST").val(GST);
    localStorage.setItem("GST" , GST);
    console.log(roundtotal)

    $("#grandTotal").val(roundtotal);
    localStorage.setItem('grandTotal' , roundtotal)
}

function addToCart(id, name, size, price) { 
        if (!items) items = [];
        let isExist = false;
        if (items.length > 0) {
            $.each(items, function (i, value) {
                // if (value.Id == id) {
                //     isExist = true;
                //     return false;
                // }
                if (value.Name == name && value.Size == size) 
                {
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
            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
            console.log(items);
            loadOrderItems();
          
        } else {
            alert('This item already added in your cart');
        }
}

function loadCouponCode()
{
    var code = $("#CouponCode").val();
    $.ajax({
        url: SERVER +"CouponCode/" + code,
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=utf-8",
        success: function (result) { 
            console.log(result);
            var date = result.ValidTill;
            var jdate = new Date(date);
            var sysdate = new Date();
            if (sysdate < jdate)
            {
            // alert("Congratulations You Got " +result.PctDiscount+"% Discount");  
            CouponDiscount = result.PctDiscount;
            console.log(CouponDiscount);
            calculateOrderTotals();
            $(".valid").html(result.PctDiscount+"%");
            $(".valid").css("display" , "block");
            $(".invalid").css("display" , "none");
            $("#CouponCode").css("border-color" , "#36ab40");
            $(".cvalid").css("display" , "block");
            $(".cinvalid").css("display" , "none");
            $(".coupon-button").css({
               'background' : '#36ab40',
               'color' : 'white'
            });

            }
            if(sysdate > jdate)
            {
            alert("Sorry This Code is Expired");
            }


            
          
            //$("#extras").html(html);
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
            $(".invalid").css("display" , "block");
            $(".valid").css("display" , "none");
            $(".cvalid").css("display" , "none");
            $("#CouponCode").css("border-color" , "#dddddd");
            $(".cinvalid").css("display" , "block");
             $(".coupon-button").css({
               'background' : '#eeeeee',
               'color' : 'black'
            });


        }
    });
}


