const express = require("express");
const cors = require("cors");
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/books", booksRouter);
app.use("/users", usersRouter);
app.use("/genres", genresRouter);
app.use("/admin", adminRouter);

app.listen(process.env.PORT, () => [
  console.log(`server runing on ${process.env.PORT}`),
]);

module.exports = app;
