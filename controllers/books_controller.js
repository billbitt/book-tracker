var express = require("express");
var router = express.Router();

// import the model
var model = require("../models/books.js");

// create routes 
router.get("/", function(request, response){
    model.getAllBooks(function(result){
        //console.log("result", result);
        //store the resulting book list as an object for handlebars to render 
        var handlebarsObject = {
            books: result
        };
        //render the book list 
        response.render("index", handlebarsObject);
    });
});

router.post("/api/books", function(request, response){
    var newBook = {
        title: request.body.title,
        author: request.body.author,
        description: request.body.description,
        isbn: request.body.isbn
    }
    // add the book 
    model.insertBook(newBook, function(result){
        //console.log("result", result);
        //re-render the book list 
        response.redirect("/");
    });
});

// route to update the book's "done" status to "true"
router.put("/api/update-status/:id", function(request, response){
    var id = request.params.id;
    var updates = [{done: true}]; //must be passed as an array of objects for orm to consume 
    // update the book's status 
    model.updateBook(id, updates, function(result){
        //console.log("result", result);
        //re-render the book list 
        response.redirect("/");
    });
});

// route to update the book's details
router.put("/api/update-details/:id", function(request, response){
    var id = request.params.id;
    var updates = [{id: request.params.id}, {rating: request.body.rating}, {notes: request.body.notes}];
    // update the book's status 
    model.updateBook(id, updates, function(result){
        //re-render the book list 
        response.redirect("/");
    });
});

// route to delete a book 
router.delete("/api/books/:id", function(request, response){
    var id = request.params.id;
    // update the book's status 
    model.deleteBook(id, function(result){
        //console.log("result", result);
        response.redirect("/");
    });
});

module.exports = router;
