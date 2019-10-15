const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Post = require('./models/post');
const mongoose = require('mongoose');
const url = 'mongodb+srv://tyro:tyro@cluster0-zqcah.mongodb.net/node-js-post?retryWrites=true&w=majority';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});
app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(result =>{ console.log(result)});
    console.log("Post successfully,  Data " + post);
    res.status(201).json({
        message: 'Post added successfully\n'
    });
});
app.get("/api/posts", (req, res, next) => {
    Post.find()
    .then((doc) =>{
      res.status(200).json({
        message: 'Post fatched successfully',
        posts: doc
      });
    })
    .catch(()=>{
        console.log('Error occure to retrieve post data');
    });
    
});

app.delete("/api/posts/:postId", (req, res, next) => {
    const id = req.params.postId;
    console.log(id);
    Post.deleteOne({_id: id})
    .then((result) =>{
        console.log(result);
       res.status(201).json({ message: "post deleted!" });
    })
});
module.exports = app; 