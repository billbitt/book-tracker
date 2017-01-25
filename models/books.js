var orm = require("../config/orm.js");

var tableName = "books";

var booksModel = {
    getBooks: function(callback){  // take a callback and run it on the response
        //s et parameters
        var columns = ["id", "title", "author", "synopsis", "rating", "notes"];
        // call function from ORM
        orm.returnAll(tableName, columns, function(response){
            callback(response);
        });
    },
    insertBook: function(bookName, callback){
        // set parameters
        var values = {name: bookName};
        //call function from ORM
        orm.insertRecord(tableName, values, function(response){
            callback(response);
        })
    },
    updateStatus: function(bookId, callback){
        // set parameters
        var condition = {id: bookId};
        var updates = {done: true};
        // call function from ORM
        orm.updateRecord(tableName, updates, condition, function(response){
            callback(response);
        })
    },
    updateBookDetails: function(bookId, updates, callback){
        // set parameters
        var condition = {id: bookId};
        // call function from ORM
        orm.updateRecord(tableName, updates, condition, function(response){
            callback(response);
        })
    },
    deleteBook: function(bookId, callback){
        // set parameters
        var condition = {id: bookId};
        // call function from ORM
        orm.deleteRecord(tableName, condition, function(response){
            callback(response);
        })
    }
    
};

module.exports = booksModel;