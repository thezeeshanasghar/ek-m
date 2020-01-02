var customer = getObjsFromLocalStorage("Customer");
$(document).ready(function () {  
});
var loadFile = function(event) {
	var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
}
const myForm = document.getElementById('myForm');
const inpFile = document.getElementById('file-input');
myForm.addEventListener("submit" , e=> {
    e.preventDefault();
    const endpoint = SERVER + "upload";
    const formData = new FormData();
    formData.append("inpFile" , inpFile.files[0]);
    fetch(endpoint , {
        method: "POST",
        body : formData  
    }).then(response => response.json())
    .then(data => {
        customer.ImagePath = data.dbPath;
      console.log(customer) // Prints result from `response.json()` in getRequest
    }).catch(console.error);
   
});
function UpdateCustomerPhoto() {
     
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