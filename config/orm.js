var connection = require("./connection.js");

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
    for (var key in object){
        if(object.hasOwnProperty(key)){
            array.push(key + " = '" + object[key] + "'");
        };
    };
    return array.join(", ")
};

// Main ORM methods 
var orm = {
    returnAll: function(tableName, columnsArray, callback){
        var columnsString = columnsArray.join(", ");
        //build the query
        var sqlQuery = "SELECT " + columnsString + " FROM " + tableName;
        // make the query 
        connection.query(sqlQuery, function(error, result){
            if (error) {
                console.log("Error occured with function orm.returnAll(). Error:");
                console.log(error);
                return;
            }
            callback(result);
        });
    },
    // method to add a new row to a tableName
    insertRecord: function(tableName, valuesObject, callback){
        var columns = valuesObject.getKeys(); //returns an array
        var values = valuesObject.getValues(); //returns an array 
        // build the query
        var sqlQuery = "INSERT INTO" + tableName + " (" + columns.join(", ") + ") ";
        sqlQuery += "VALUES (" + printQuestionMarks(values.length) + ")";
        // make the query
        conneciton.query(sqlQuery, values, function(error, result){
            if (error) {
                console.log("Error occured with function orm.insertRecord(). Error:");
                console.log(error);
                return;
            };
            callback(result);
        });
    },
    // method to update a row
    updateRecord: function(tableName, valuesObject, conditionObject, callback){
        //build the query
        var sqlQuery = "UPDATE " + tableName + " ";
        sqlQuery += "SET " + objectToSql(valuesObject) + " ";
        sqlQuery += "WHERE " + objectToSql(conditionObject);
        // make the query
        connection.query(sqlQuery, function(error, data) {
            if (error) {
                console.log("Error occured with function orm.updateRecord(). Error:");
                console.log(error);
                return;
            };
            callback(result);
        });
    },
    // method to delete a row
    deleteRecord: function(tableName, conditionObject, callback){
        //build the query
        var sqlQuery = "DELETE FROM " + tableName + " ";
        sqlQuery += "WHERE " + cobjectToSQL(condition);
        // make the query
        connection.query(sqlQuery, function(error, data) {
            if (error) {
                console.log("Error occured with function orm.deleteRecord(). Error:");
                console.log(error);
                return;
            };
            callback(result);
        });
    }
};