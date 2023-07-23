const express = require('express');

const app = express();

const booksRouter = require('./routers/books');
const usersRouter = require('./routers/users');


require('dotenv').config();

//middleware qui va interpréter les body de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// systeme de routing fonction qui gère les routes prefixe de routes (declare des routes vers books)
app.use('/books', booksRouter);
app.use('/users', usersRouter);

//ouverture du port
app.listen(process.env.PORT,() => [
    console.log(`server runing on ${process.env.PORT}`)
]);

module.exports = app;