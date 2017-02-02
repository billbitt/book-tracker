module.exports = {
    //method to get sources from Google Books 
    getSources: function (request, response) {  // autocomplete will pass the search term, and wants a string or array of results back.
        $.ajax({
            method: "POST",
            url: "/api/search/googleBooks",
            dataType: "json",
            data: {searchTerm: encodeURIComponent(request.term)}, 
            success: function(data) {
                //console.log(data);
                var sourceList = JSON.parse(data)
                console.log(sourceList);
                response($.map(sourceList.items, function (item) {  // map each item in the source list and send back through the callback 
                    if (item.volumeInfo.authors && item.volumeInfo.title && item.volumeInfo.industryIdentifiers) {
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
                    };
                }));
            }
        });
    }
};