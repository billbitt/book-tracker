// require main dependencies  
var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var expressHandlebars = require("express-handlebars");

// define & initialize the server 
var app = express();
// define the port 
var PORT = process.env.PORT || 8080;

// configure server to make the public folder accessable 
app.use(express.static(process.cwd() + "/public"));

// configure server to use body parser
app.use(bodyParser.json()); //allows for json 
app.use(bodyParser.urlencoded({ extended: false}));

// configure server to use method override
app.use(methodOverride("_method"));

// configure the server to use handlebars
app.engine("handlebars", expressHandlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// import routes
var routes = require("./controllers/books_controller.js");
// set up one catch all route to direct to the others 
app.use("/", routes);

// start server to listen on the part  
app.listen(PORT, console.log("listening on PORT", PORT));

