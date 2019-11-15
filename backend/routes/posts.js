const express = require('express');
const multer = require('multer');
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

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
    //console.log(name+'...'+ext);
    cb(null, name + '-' + Date.now()+'.' + ext);
  }
});

router.post("",checkAuth,  multer({storage}).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
      creator: req.userData.userId 
  }); 
  post.save().then(createdPost => {
      console.log("create post " + createdPost);
      res.status(201).json({
          message: 'Post added successfully',
          post: {
            /*
            title: createdPost.title,
            content: createdPost.content,
            imagePath: createdPost.imagePath,
            */
           ...createdPost,
            id: createdPost._id
          }
      });
  });

});
router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const pageQuery = Post.find();
  let fatchedPosts;
  if (pageSize && currentPage){
    pageQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  pageQuery.then(document => {
    fatchedPosts = document;
    return Post.countDocuments(); // count function deprecated
  })
  .then(count => {
    //console.log("count " + count);
    res.status(200).json({
      message: 'Post fatched successfully',
      posts: fatchedPosts,
      maxPosts: count
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
router.put(
  "/:postId", 
  checkAuth,
  multer({storage}).single('image'), 
  (req, res, next) => {
    const id = req.params.postId;
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
    }
    const post = new Post({
      _id: id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath  
    });
    Post.updateOne({ _id : id, creator: req.userData.userId},post)
      .then(result =>{
        if (result.nModified > 0){
          res.status(201).json({ message: "Update successfully" });
        } else {
          res.status(401).json({ message: "Not Authorized" });
        }
      })
});

router.delete("/:postId",checkAuth, (req, res, next) => {
  const id = req.params.postId;
  Post.deleteOne({_id: id, creator: req.userData.userId})
  .then((result) =>{
    if (result.n > 0){
      res.status(201).json({ message: "Deletion successfully" });
    } else {
      res.status(401).json({ message: "Not Authorized" });
    }
  });
});

module.exports = router;
