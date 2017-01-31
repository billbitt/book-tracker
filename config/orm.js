var connection = require("./connection.js");
var request = require("request");

// helper function to print question marks
function printQuestionMarks(number){
    var array = [];
    for (var i = 0; i < number; i++){
        array.push("?");
    };
    return array.join(", ");
};

//helper function to get the keys from an object
function getKeys(object){
    var array = [];
    for (var key in object){
        if(object.hasOwnProperty(key)){
            array.push(key);
        };
    };
    return array;
};

//helper function to get the properties from an object
function getProperties(object){
    var array = [];
    for (var key in object){
        if(object.hasOwnProperty(key)){
            array.push(object[key]);
        };
    };
    return array;
};

//helper function to turn an object into SQL-ready string
function objectToSql(object){
    var array = [];
    var text = "";
    for (var key in object){
        if(object.hasOwnProperty(key)){
            if (typeOf(object[key]) === "string"){
                text = key + " = '" + object[key] + "'";
            } else {
                text = key + " = " + object[key];
            }
            array.push(text);
        };
    };
    return array.join(", ")
};

// Main ORM methods 
var orm = {
    returnAll: function(tableName, columnsArray, callback){
        var columnsString = columnsArray.join(", ");
        //build the query
        var sqlQuery = "SELECT " + columnsString + " FROM " + tableName;  //utilize the escapes 
        console.log(sqlQuery);
        // make the query 
        connection.query(sqlQuery, function(error, data){
            if (error) {
                console.log("Error occured with function orm.returnAll(). Error:");
                console.log(error);
                return;
            }
            console.log("data", data);
            callback(data);
        });
    },
    // method to add a new row to a tableName
    insertRecord: function(tableName, valuesObject, callback){
        var columns = getKeys(valuesObject).join(", "); //returns an array
        var values = getProperties(valuesObject); //returns an array 
        // build the query
        var sqlQuery = "INSERT INTO " + tableName + " (" + columns + ") ";
        sqlQuery += "VALUES (" + printQuestionMarks(values.length) + ")";
        console.log(sqlQuery);
        console.log(JSON.stringify(values));
        // make the query
        connection.query(sqlQuery, values, function(error, data){
            if (error) {
                console.log("Error occured with function orm.insertRecord(). Error:");
                console.log(error);
                return;
            };
            callback(data);
        });
    },
    // method to update a row
    updateRecords: function(tableName, valuesArray, conditionObject, callback){
        console.log(valuesArray);
        //build the query
        var sqlQuery = "UPDATE " + tableName + " ";  //should include table name as an escaped value 
        sqlQuery += "SET " + printQuestionMarks(valuesArray.length) + " ";
        sqlQuery += "WHERE ?";
        console.log(sqlQuery);
        // make the query
        valuesArray.push(conditionObject);
        console.log(valuesArray);
        connection.query(sqlQuery, valuesArray, function(error, data) {
            if (error) {
                console.log("Error occured with function orm.updateRecords(). Error:");
                console.log(error);
                return;
            };
            callback(data);
        });
    },
    // method to delete a row
    deleteRecords: function(tableName, conditionObject, callback){
        // build the query 
        var sqlQuery = "DELETE FROM " + tableName + " ";
        sqlQuery += "WHERE ?";
        // make the query 
        console.log(sqlQuery);
        connection.query(sqlQuery, conditionObject, function(error, data) {
            if (error) {
                console.log("Error occured with function orm.deleteRecords(). Error:");
                console.log(error);
                return;
            };
            callback(data);
        });
    },
    // method to search google books
    googleBooksSearch: function(searchTerm, callback){
        // url link to google books, including text entered by user (searchTerm)
        var booksUrl = "https://www.googleapis.com/books/v1/volumes?printType=books&q=" + searchTerm;

        request({method: "GET", dataType: "jsonp", url: booksUrl}, function (error, response, body) {
            if (!error && response.statusCode == 200) {        
                //console.log(body) // Show the HTML for the Google homepage. 
                callback(body);
            };
        });
    }
};

module.exports = orm;