var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

const url = 'mongodb://localhost:27017';
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('NEW PAGE RENDERED');
  res.render('logIn');
});

router.post('/lg', function(req, res, next) {
  console.log("login");
  user ={
    username: req.body.username,
    password: req.body.password,
  };
  mongo.connect(url,{ useUnifiedTopology: true }, function(err, db) {
    assert.equal(null, err);
    var dbo = db.db("user-data");
    dbo.collection("user-data").find({}).toArray(function(err, result) {
      for (var i = 0; i < result.length; i++){
        if (user.username == result[i].username){
          if (user.password == result[i].password){
            user = result[i];
            console.log(result[i]);
          }
          break;
        }
      }
    });
  })
  console.log(user);
  console.log("DONE!!!!");
})

module.exports = router;
