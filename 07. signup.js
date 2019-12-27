$(document).ready(function () {
			$(".animsition").animsition({
				inClass: 'fade-in',
				outClass: 'fade-out',
				inDuration: 1500,
				outDuration: 800,
				linkElement: '.animsition-link',
			    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
			    loading: true,
			    loadingParentElement: 'body', //animsition wrapper element
			    loadingClass: 'animsition-loading',
			    loadingInner: '', // e.g '<img src="loading.svg" />'
			    timeout: false,
			    timeoutCountdown: 5000,
			    onLoadEvent: true,
			    browser: [ 'animation-duration', '-webkit-animation-duration'],
			    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
			    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
			    overlay : false,
			    overlayClass : 'animsition-overlay-slide',
			    overlayParentElement : 'body',
			    transition: function(url){ window.location.href = url; }
			});

			// $("#SignupBtn").click(function(){
			// 	$.ajax({
			// 	  type: "POST",
			// 	  url: "https://13.127.49.104:5001/api/customer",
			// 	  data: JSON.stringify({
			// 	  	Name: $("#name").val(),
			// 	  	Email: $("#email").val(),
			// 	  	Password:$("#Password").val(),
			// 	  	CityId: 16
			// 	  }),
			// 	  success: function() {
			// 	  	// reset form
			// 	  	// show success message
			// 	  	// 
			// 	  },
			// 	  failure: function() { console.log("data not posted")},
			// 	  dataType: 'json',
			// 	  contentType: "application/json; charset=utf-8"
			// 	});
			// });
    
});

function SignUp() {

    obj = {
        "Name": $("#Name").val(),
        "Email": $("#Email").val(),
        "Password": $("#Password").val(),
		"MobileNumber": $("#MobileNo").val(),
		"CityId": 1
    }
console.log (obj);
    $.ajax({
        url: SERVER + "customer",
        type: "POST",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
               localStorage.setItem("Customer", JSON.stringify(result));
               window.location.href = "11. welcome.html";
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}    