var customer = getObjsFromLocalStorage("Customer");
$(document).ready(function () {
    
    $("#edit-pswd").val(customer.Password);
});

function UpdatePassword() {
    
    customer.Password = $("#new-pswd").val();
    $.ajax({
        url: SERVER + "Customer/" + customer.Id,
        type: "PUT",
        dataType: "JSON",
        data: JSON.stringify(customer),
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            localStorage.setItem("Customer" , JSON.stringify(customer));  
            window.location.href="30. edit-profile.html";       
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}