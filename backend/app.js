const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const postRouter = require('./routes/posts');

const mongoose = require('mongoose');
const url = 'mongodb+srv://tyro:tyro@cluster0-zqcah.mongodb.net/node-js-post?retryWrites=true&w=majority';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() =>{
    console.log('Database connected');
  })
.catch(() =>{
    console.log('Connection Failed');
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Request-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST,PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/posts", postRouter);

module.exports = app;
