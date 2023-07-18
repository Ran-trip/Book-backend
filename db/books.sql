DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `authorBook`;
DROP TABLE IF EXISTS `books`;
DROP TABLE IF EXISTS `genres`;

DROP TABLE IF EXISTS `authors`;
DROP TABLE IF EXISTS `publishers`;


CREATE TABLE `users` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(10) NOT NULL
);

CREATE TABLE `genres` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL
);

CREATE TABLE `authors` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `fullname` VARCHAR(150) NOT NULL
);

CREATE TABLE `publishers` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `city`VARCHAR(255) NOT NULL
);

CREATE TABLE `books` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `releaseDate`DATE NOT NULL,
    `picture` VARCHAR(255),
    `price` FLOAT,
    `publisherId` INT,
    `genreId` INT,
    Foreign Key (publisherId) REFERENCES publishers(id),   
    Foreign Key (genreId) REFERENCES genres(id)
);

CREATE TABLE `authorBook` (
    `authorId`INT,
    `bookId`INT,
    Foreign Key (authorId) REFERENCES authors(id),   
    Foreign Key (bookId) REFERENCES books(id)
);

