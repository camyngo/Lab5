/*global $*/
$(document).ready(function() {
    $("#deleteComments").click(function() {
        $.ajax({
            url: "comment",
            type: "DELETE",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        })
    });
    
    // post a comment when button is on click
    $("#postComment").click(function() {
        var myobj = { Name: $("#name").val(), Comment: $("#comment").val() };
        // make the whole object into a string
        jobj = JSON.stringify(myobj);
        //print out the string
        $("#json").text(jobj);
        var url = "comment";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        })
    });
    

    $("#getComments").click(function() {
        var URL = "comment?q=";
        if ($("#query").val()){
            URL+= $("#query").val();
        }
        console.log(URL);
        $.getJSON(URL, function(data) {
            console.log(data);
            var everything = "<ul>";
            for (var comment in data) {
                com = data[comment];
                everything += "<li> Name: " + com.Name + " - Comment: " + com.Comment + "</li>";
            }
            everything += "</ul>";
            $("#comments").html(everything);
        })
    })
});
