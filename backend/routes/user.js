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
  console.log("email " + req.body.email + " pass " + req.body.password);
  let fatchUser;
  User
    .findOne({email: req.body.email})
    .then(user => {
      if(!user){
        return res.status(401).json({
          message: 'Auth Fail'
        })
      }
      fatchUser = user;
      return bcrypt.compare(req.body.password,user.password);
    })
    .then(result => {
      if(!result){
        return res.status(401).json({
          message: 'Auth Fail'
        })
      }
      console.log("-> " + fatchUser +" <-");
      const token = jwt.sign(
        { email: fatchUser.email, userId: fatchUser._id},
        "secret_key_should_be_longer",
        { expiresIn: "1h"}
      );
      console.log("Token " + token);
      res.status(200).json({
        token: token
      });
    })  
    .catch(err => {
      console.log(":(");
      return res.status(401).json({
        message: 'Auth Fail'
      })
    });
});
module.exports = router;