var orm = require("../config/orm.js");

var tableName = "books";

var model = {
    getAllBooks: function(callback){  // take a callback and run it on the response
        //s et parameters
        var columns = ["id", "title", "author", "description", "rating", "notes", "done"];
        // call function from ORM
        orm.returnAll(tableName, columns, function(response){
            callback(response);
        });
    },
    insertBook: function(values, callback){
        //call function from ORM
        orm.insertRecord(tableName, values, function(response){
            callback(response);
        })
    },
    updateBook: function(bookId, updates, callback){
        // set parameters
        var condition = {id: bookId};
        // call function from ORM
        orm.updateRecords(tableName, updates, condition, function(response){  //conditions and updates are flipped from input
            callback(response);
        })
    },
    deleteBook: function(bookId, callback){
        // set parameters
        var condition = {id: bookId};
        // call function from ORM
        orm.deleteRecords(tableName, condition, function(response){
            callback(response);
        })
    }
    
};

module.exports = model;