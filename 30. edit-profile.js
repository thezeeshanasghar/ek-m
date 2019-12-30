$(document).ready(function () {
    var customer = getObjsFromLocalStorage("Customer");
    $("#Name").html(customer.Name);
    $("#Email").html(customer.Email);
    $("#Mobile").html(customer.MobileNumber);
});



$("form#data").submit(function (e) {
    if (isLoggedIn()) {
        if (validatePassword()) {
            e.preventDefault();
            var formData = new FormData(this);
            var customer = getObjsFromLocalStorage("Customer");
            var customerId = customer.Id;
            var obj = {
                Name: $("#Name").val(),
                MobileNumber: $("#MobileNo").val(),
                Email: $("#Email").val(),
                Password: $("#Password").val()
            }
            
            formData.append("Customer", JSON.stringify(obj));

            $.ajax({
                url: SERVER + "Customer/edit-profile/" + customerId,
                type: "PUT",
                data: formData,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (result) {
                        localStorage.setItem("Customer", JSON.stringify(result));
                        alert("Your profile is updated successfully");
                },
                error: function (xhr, status, error) {
                    console.log(error);
                },
                cache: false,
                contentType: false,
                processData: false
            });
        } else {
            alert("Password is mismatched")
        }
    } else {
        alert('Please login first');
    }
});

function validatePassword() {
    if ($("#newPassword").val() && $("#Password").val()) {
        if ($("#newPassword").val() === $("#Password").val()) {
            return true;
        } else {
            return false;
        }
    } else {
        $("#Password").val($("#oldPassword").val());
        return true;
    }
}
