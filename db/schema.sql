CREATE DATABASE books_db;

USE books_db;

DROP TABLE books;

CREATE TABLE books (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    title VARCHAR(500) NOT NULL,
    author VARCHAR(200),
    description VARCHAR(2000),
    isbn VARCHAR(100),
    rating VARCHAR(2),
    notes VARCHAR(250),
    done BOOLEAN DEFAULT FALSE NOT NULL,
    date_added DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    date_completed DATETIME,
    PRIMARY KEY (id)
);

SELECT * FROM books;