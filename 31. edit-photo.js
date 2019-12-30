var customer = getObjsFromLocalStorage("Customer");
$(document).ready(function () {
});
var loadFile = function(event) {
	var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
}

function UpdateCustomerPhoto(e) {
    
    //customer.ImagePath = $("#output").Src();
    var File = URL.createObjectURL(event.target.files[0]);
    var formData = new FormData();
    formData.append("fileToUpload", File);
    $.ajax({
        url: SERVER + "Customer/" + customer.Id,
        type: "PUT",
        dataType: "JSON",
        //data: JSON.stringify(customer),
        data:formData,
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            localStorage.setItem("Customer1" , JSON.stringify(customer));
            window.location.href="30. edit-profile.html";       
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}