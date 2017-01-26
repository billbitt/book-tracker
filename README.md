# book-tracker
An application to help me track the books I want to read and those I have already read.

## Project highlights
+ Wrote entire backend of the application 
 * Used Express.js for the server and MySQL for the database
 * Utilized MVC structure
+ Wrote my own ORM to communicated between my model and database
+ Wrote front end using HTML, Handlebars.js, CSS, and JavaScript

### Application flow
+ The user can search for a new book by title or author
 * Suggestions are rendered using jQuery UI's autofill feature
+ If the user adds the new book, it is displayed in the "I want to read" list
 * Additional details, such as a description of the book, are obtained from google's Google Books API and displayed for the user
 * The book's details are stored in a SQL database using MySQL
 * Handlebars.js is used to display the books on the front end 
+ Users can move the book from their "I want to read" list to their "I have completed reading" list
 * making this change initiates a call to the backend to change the book's "done" status in the database 
+ For all books the user has read, the user can store a rating and personal notes
 * Such details are stored in the database

### APIs
+ Google Books
 * used for search field auto-fill and to retreive additional details on selected books (description, etc.)
+ Custom API developed for the front end to interact with the back end.

### Node modules 
+ Express (to handle routing and serving data)
+ Body-parser (to process API requests)
+ Method-override (to enable PUT and DELETE requests directly from forms in the HTML)
+ Express-handlebars (to quickly deliver and render HTML using data from MySQL)
+ MySQL (for storing and retrieving data)

### Libraries
+ jQuery
+ jQuery UI
+ Google Fonts 

### Screenshot
![book tracker](http://book-tracker/public/assets/img/bookTracker.png)
