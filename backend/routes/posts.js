const express = require('express');

const router = express.Router();
const Post = require('../models/post');

router.post("", (req, res, next) => {
  const post = new Post({
      title: req.body.title,
      content: req.body.content
  });
  post.save().then(createdPost =>{
      res.status(201).json({
          message: 'Post added successfully',
          postId: createdPost._id
      });
  });

});
router.get("", (req, res, next) => {
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
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Post.findById(id).then( post => {
    if(post){
      res.status(200).json(post);
    }
    else{
      res.status(500).json({ message: "Post not found"});
    }
  });
});
router.put("/:postId", (req, res, next) => {
  const id = req.params.postId;
  const post = new Post({
      _id: id,
      title: req.body.title,
      content: req.body.content
  });
  console.log(id);
  Post.updateOne({ _id : id},post).then(result =>{
      res.status(201).json({ message: "post update successfully" });
  })
});

router.delete("/:postId", (req, res, next) => {
  const id = req.params.postId;
  console.log(id);
  Post.deleteOne({_id: id})
  .then((result) =>{
      console.log(result);
     res.status(201).json({ message: "post deleted!" });
  })
});

module.exports = router;
