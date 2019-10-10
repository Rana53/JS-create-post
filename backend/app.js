const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Post = require('./models/post');
const mongoose = require('mongoose');
const url = 'mongodb+srv://tyro:ZRg3THFiaFJsFumr@cluster0-5qfbo.mongodb.net/test?retryWrites=true&w=majority';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(url)
  .then(() =>{
    console.log('Database connected');
  })
.catch(() =>{
    console.log('Connection Failed error occur');
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Request-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});
app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log("Post successfully Data " + post);
    res.status(201).json({
        message: 'Post added successfully'
    });
});
app.get("/api/posts", (req, res, next) => {
    const posts = [{
            id: "5whefdjhjadslfj",
            title: "First server-side post",
            content: "This is comming from server"
        },
        {
            id: "764wgkdajgfdwg",
            title: "Second server-side post",
            content: 'This is also comming from server'
        }
    ];
    res.status(200).json({
        message: 'Post fatched successfully',
        posts: posts
    });
});


module.exports = app;