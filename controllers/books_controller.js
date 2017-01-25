var express = require("express");
var router = express.Router();

// import the model
var booksModel = require("../models/books.js");

// create routes 
router.get("/", function(request, response){
    booksModel.getBooks(function(result){
        //store the book list as an object for handlebars 
        var handlebarsObject = {
            books: result
        };
        //render the book list 
        response.render("index", handlebarsObject);
    });
});

router.post("/api/books", function(request, response){
    var name = request.body.bookName;
    // add the book 
    booksModel.insertBook(name, function(){
        //re-render the book list 
        booksModel.getBooks(function(result){
            var handlebarsObject = {
                books: result
            };
            response.render("index", handlebarsObject);
        });
    });
});

// route to update the book's "done" status to "true"
router.put("/api/update-status/:id", function(request, response){
    var id = request.params.id;
    // update the book's status 
    booksModel.updateStatus(id, function(){
        //re-render the book list 
        booksModel.getBooks(function(result){
            var handlebarsObject = {
                books: result
            };
            response.render("index", handlebarsObject);
        });
    });
});

// route to update the book's details
router.put("/api/update-details/:id", function(request, response){
    var id = request.params.id;
    var updates = {
        id: request.params.id,
        rating: request.body.Rating,
        notes: request.body.Notes
    }
    // update the book's status 
    booksModel.updateBookDetails(id, updates, function(){
        //re-render the book list 
        booksModel.getBooks(function(result){
            var handlebarsObject = {
                books: result
            };
            response.render("index", handlebarsObject);
        });
    });
});

// route to delete a book 
router.delete("/api/books/:id", function(request, response){
    var id = request.params.id;
    // update the book's status 
    booksModel.deleteBook(id, function(){
        //re-render the book list 
        booksModel.getBooks(function(result){
            var handlebarsObject = {
                books: result
            };
            response.render("index", handlebarsObject);
        });
    });
});

module.exports = router;
