var mysql = require("mysql");
var connection;

var credentials = require("./credentials");

//set connection to jawsDB.  default to local host for testing.
if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: credentials.user,
        password: credentials.password,
        database: "books_db"
    })
};

connection.connect(function(error){
    if (error){
        console.log("Could not connect to MySQL. Error:");
        console.log(error);
        return;
    }
    console.log("Connected to MySql as connection:", connection.threadId);
});

//export the connection 
module.exports = connection;