function PostVote() {

    obj = {
        "City": $("#cityname").val(),
        "UserName": $("#votername").val(),
        "MobileNumber": $("#cellnumber").val(),
		"Message": $("#message").val(),
    }
console.log (obj);
    $.ajax({
        url: SERVER + "vote",
        type: "POST",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
               window.location.href = "15. vote-submit.html";
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}    