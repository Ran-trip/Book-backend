const express = require("express");
const cors = require("cors");
// const checkJwt = require('./middlewares/checkJwt.JS')
const app = express();

const booksRouter = require("./routers/books");
const usersRouter = require("./routers/users");
const genresRouter = require("./routers/genres");
const adminRouter = require("./routers/admin");

require("dotenv").config();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));

//middleware comprendre les requête de type json, qui va être interpréter les body de la requête sous forme de json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// systeme de routing fonction qui gère les routes prefixe de routes (ex: declare des routes vers books)
app.use("/books", booksRouter);
app.use("/users", usersRouter);
app.use("/genres", genresRouter);

app.use("/admin", adminRouter);
// app.use("/admin", checkJwt);

//ouverture du port
app.listen(process.env.PORT, () => [
  console.log(`server runing on ${process.env.PORT}`),
]);

module.exports = app;
