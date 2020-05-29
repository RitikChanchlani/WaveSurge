var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var user;


const url = 'mongodb://localhost:27017';
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('NEW PAGE RENDERED');
  res.render('logIn');
});

router.post('/log', function(req, res, next) {
  console.log("login");
  // var user ={
  //   username: req.body.username,
  //   password: req.body.password,
  //   number: "0"
  // };
  mongo.connect(url,{ useUnifiedTopology: true }, function(err, db) {
    assert.equal(null, err);
    var dbo = db.db("user-data");
    dbo.collection("user-data").find({}).toArray(function(err, result) {
      for (var i = 0; i < result.length; i++)
      {
        if (req.body.username == result[i].username)
        {
          if (req.body.password == result[i].password)
          {
            user = result[i];
            console.log("This is the result:");
            console.log(user);
            module.exports.user = user; 
            res.redirect('/home');
          }
          break;
        }
      }
    });
  })
})

module.exports = router;