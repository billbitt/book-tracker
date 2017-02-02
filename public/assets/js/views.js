var frontEndFunctions = require("./frontEndFunctions");

$(document).ready(function () {  // only begin once page has loaded

    // add auto-fill functionality to the title search 
    $("#bookSearch").autocomplete({ // attach auto-complete functionality to textbox
        // settings
        autoFocus: true,
        minLength: 2, // set minimum length of text the user must enter

        // use the back end to provide a source for the autocomplete via googleBooks api
        source: frontEndFunctions.getSources(request, response),  // autocomplete will pass (1) a request with the search term and (2) response 
        // when a title is selected, store that data in the submit button
        select: function (event, ui) {
            $("#button-add").attr("data-title", ui.item.title);
            $("#button-add").attr("data-author", ui.item.author);
            //clip description if it is too long
            var description = ui.item.description;
            if (description.length > 500){
                description = description.slice(0, 497) + "...";
            }
            $("#button-add").attr("data-description", description);
            $("#button-add").attr("data-isbn", ui.item.isbn[0].identifier);
        }
    });

    $("#button-add").on("click", function(){
        if ($("#bookSearch").val().trim() != ""){  //make sure there is a value in the search 
            $.ajax({
                url: "/api/books",
                dataType: "json",
                method: "POST",
                data: {
                    "title": $(this).data("title"),
                    "author": $(this).data("author"),
                    "description": $(this).data("description"),
                    "isbn": $(this).data("isbn")
                },
                success: function(data) {
                    console.log("book submitted successfully")
                },
            });
        };
    });

});