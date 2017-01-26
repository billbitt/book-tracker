 
$(document).ready(function () {  // only begin once page has loaded

    // add auto-fill functionality to the title search 
    $("#bookSearch").autocomplete({ // attach auto-complete functionality to textbox
        // settings
        autoFocus: true,

        // define source of the data
        source: function (request, response) {
            // url link to google books, including text entered by user (request.term)
            var booksUrl = "https://www.googleapis.com/books/v1/volumes?printType=books&q=" + encodeURIComponent(request.term);
            $.ajax({
                url: booksUrl,
                dataType: "jsonp",
                success: function(data) {
                    response($.map(data.items, function (item) {
                        if (item.volumeInfo.authors && item.volumeInfo.title && item.volumeInfo.industryIdentifiers && item.volumeInfo.publishedDate)
                        {
                            return {
                                // label value will be shown in the suggestions
                                label: item.volumeInfo.title + ", by: " + item.volumeInfo.authors[0],
                                // value is what gets put in the textbox once an item selected
                                value: item.volumeInfo.title + ", by: " + item.volumeInfo.authors[0],
                                // other individual values to use later
                                title: item.volumeInfo.title,
                                author: item.volumeInfo.authors[0],
                                isbn: item.volumeInfo.industryIdentifiers,
                                description: item.volumeInfo.description
                            };
                        }
                    }));
                }
            });
        },
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
        },
        minLength: 2 // set minimum length of text the user must enter
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
                    console.log("button ajax success data", data)
                },
            });
        };
    });

});