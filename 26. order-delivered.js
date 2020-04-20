
var RiderId = getObjsFromLocalStorage("RiderId");
var Customer = getObjsFromLocalStorage("Customer");
var CustomerId = Customer.Id;

$(document).ready(function(){
    // loadCities();
    console.log("Ok");
    $("#star1").click(function(){

        $("#rider-rating label").css("pointer-events","none");


        var riderrating = {
            CustomerId: CustomerId,
            Value: 5,
            RiderId:RiderId
        }

        $.ajax({
            type: "POST",
            url: SERVER + "riderrating",
            data: JSON.stringify(riderrating),
            dataType: "JSON",
            contentType: "application/json;charset=utf-8",
            success: function (data) {

                
                console.log("Successfully Rated!");
                window.location.href = "16. selected-location.html";


            },

            error: function(xhr, status, error) {
                console.log(xhr.responseText);
            }

        });

    });





    $("#star2").click(function(){

        $("#rider-rating label").css("pointer-events","none");


        var riderrating = {
            Value: 4,
            CustomerId: CustomerId,
            RiderId:RiderId
        }

        $.ajax({
            type: "POST",
            url: SERVER + "riderrating",
            data: JSON.stringify(riderrating),
            dataType: "JSON",
            contentType: "application/json;charset=utf-8",
            success: function (data) {

                
                console.log("Successfully Rated!");
                window.location.href = "16. selected-location.html";


            },

            error: function(xhr, status, error) {
                console.log(xhr.responseText);
            }

        });

    });





    $("#star3").click(function(){

        $("#rider-rating label").css("pointer-events","none");


        var riderrating = {
            Value: 3,
            CustomerId: CustomerId,
            RiderId:RiderId
        }

        $.ajax({
            type: "POST",
            url: SERVER+ "riderrating",
            data: JSON.stringify(riderrating),
            dataType: "JSON",
            contentType: "application/json;charset=utf-8",
            success: function (data) {

                
                console.log("Successfully Rated!");
                window.location.href = "16. selected-location.html";


            },

            error: function(xhr, status, error) {
                console.log(xhr.responseText);
            }

        });

    });



    $("#star4").click(function(){

        $("#rider-rating label").css("pointer-events","none");


        var riderrating = {
            Value: 2,
            CustomerId: CustomerId,
            RiderId:RiderId
        }

        $.ajax({
            type: "POST",
            url: SERVER + "riderrating",
            data: JSON.stringify(riderrating),
            dataType: "JSON",
            contentType: "application/json;charset=utf-8",
            success: function (data) {

                
                console.log("Successfully Rated!");
                window.location.href = "16. selected-location.html";


            },

            error: function(xhr, status, error) {
                console.log(xhr.responseText);
            }

        });

    });


    $("#star5").click(function(){

        $("#rider-rating label").css("pointer-events","none");
        

        var riderrating = {
            Value: 1,
            CustomerId: CustomerId,
            RiderId:RiderId
        }

        $.ajax({
            type: "POST",
            url: SERVER + "riderrating",
            data: JSON.stringify(riderrating),
            dataType: "JSON",
            contentType: "application/json;charset=utf-8",
            success: function (data) {

                
                console.log("Successfully Rated!");
                window.location.href = "16. selected-location.html";


            },

            error: function(xhr, status, error) {
                console.log(xhr.responseText);
            }

        });

    });






});