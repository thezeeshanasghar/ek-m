$(document).ready(function(){

  bannerHeading();

});

function bannerHeading() {

  $.ajax({

    url: "http://localhost:3000/rest",
    type: "GET",
    dataType: "JSON",
    contentType: "application/json;charset=utf-8",
    success: function(result){
      console.log(result);

    },
    error: function(xhr, status, error){
      console.log(xhr.responseText);
    }


  });

}