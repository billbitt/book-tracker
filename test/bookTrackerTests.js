var expect  = require("chai").expect;
//var search = require("../app/converter");
var frontEndFunctions = require("../public/assets/js/frontEndFunctions.js");
var controller = require("../controllers/books_controller.js");
var model = require("../models/books.js");
var orm = require("../config/orm.js");
var connection = require("../config/connection.js");
var credentials = require("../config/credentials.js");

describe("Book Search Bar", function(){
    describe("Author Search", function(){
        it("returns a book based on the author", function(){

        });
    });
    
    describe("Title Search", function(){
        it("returns a book based on the title", function(){

        });
    });
});

describe("Connection", function(){
    it("Connected to local database", function(){
        var host = connection.config.host;
        expect(host).to.equal("localhost");
    });
    it("Connected to production database", function(){
        var host = connection.config.host;
        expect(host).to.equal("something else");
    });
});