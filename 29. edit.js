var Customer = getObjsFromLocalStorage("Customer");
var UserName = 'Hello ' +Customer.Name+ '!' ;
$("#UserName").html(UserName);