var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

const url = 'mongodb://localhost:27017';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/newUser',function(req,res,next){

  var item ={
    username: req.body.username,
    password: req.body.password,
    reenter: req.body.repassword,
    orginization: req.body.orginizationCode
  };

  mongo.connect(url,{ useUnifiedTopology: true }, function(err, db) {
      assert.equal(null, err);
      var dbo = db.db("user-data");
      dbo.collection('user-data').insertOne(item, function(err, result) { 
        // if (err) throw err;
        console.log('Item inserted');
    });
    dbo.collection("user-data").find({}).toArray(function(err, result) {
      // if (err) throw err;
      console.log(result);
    });
  })
  res.redirect('/login');
});

module.exports = router;
