const express = require ('express');

const app = express();
require('dotenv').config()

const port = 8000;

app.listen(process.env.PORT,() => [
    console.log(`server runing on ${process.env.PORT}`)
]);