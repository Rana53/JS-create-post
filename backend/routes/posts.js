const express = require('express');
const multer = require('multer');
const router = express.Router();
const Post = require('../models/post');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if(isValid){
      error = null
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    console.log(name+'...'+ext);
    cb(null, name + '-' + Date.now()+'.' + ext);
  }
});
router.post("",multer({storage}).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images" + req.file.filename
  });
  post.save().then(createdPost =>{
      console.log(createdPost);
      res.status(201).json({
          message: 'Post added successfully',
          ...createdPost,
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
