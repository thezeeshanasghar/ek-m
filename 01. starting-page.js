$(document).ready(function() {
			
    setTimeout(function(){

        if (isLoggedIn()) 
        {
            window.location.href = "11. welcome.html"; }
        else { 
            window.location.href = "02. pick-restaurant.html";
        }
      
    }, 2000);
});