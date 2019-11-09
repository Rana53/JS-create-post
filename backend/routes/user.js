const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created',
            result: result
          });
        })
        .catch(err => {
            console.log('wrong ' + err);
            res.status(500).json({
                error: err
            })
        });
      });

});

router.post("/login", (req, res, next) => {
  let fetchUser;
  User
    .findOne({email: req.body.email})
    .then(user => {
      if(!user){
        //console.log('user not found');
        throw new Error("User profile not found");
      }
      fetchUser = user;
      return bcrypt.compare(req.body.password,user.password);
    })
    .then(result => {
      //console.log("Result " + result);
      if(!result){
        throw new Error("Password not match with user")
      }
      const token = jwt.sign(
        { email: fetchUser.email, userId: fetchUser._id},
        "secret_key_should_be_longer",
        { expiresIn: "1h"}
      );
      //console.log("successfully log in");
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      console.log("error occure !! " + err);
      res.status(401).json({
        message: err
      })
    });
});
module.exports = router;