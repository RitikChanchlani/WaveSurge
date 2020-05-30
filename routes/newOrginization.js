var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var userInfo = require('./login');
const url = 'mongodb://localhost:27017';

router.get('/', function(req, res, next) {
	console.log('NEW PAGE RENDERED');
	res.render('newOrginization');
	console.log(userInfo.user);
});

router.post('/new', function(req, res, next){
	var code = req.body.orginizationCode;
	var name = req.body.orginizationName;
	var newOrginization = true;
	mongo.connect(url,{ useUnifiedTopology: true }, function(err, db) {
		assert.equal(null, err);
		var dbo = db.db("orginizations");
		dbo.collection("orginizations").find({}).toArray(function(err, result) {
			if (err) throw err;
		  	for (var i = 0; i <result.length; i++){
				if (code === result[i]){
			  		newOrginization = false;
				}
			}
		});
		console.log(newOrginization);
		if(newOrginization){
			//There is an error here on the JSON.parse
			console.log(code);
			var orginization = {
				code: code,
				name: name
			};
			dbo.collection('orginizations').insertOne(orginization, function(err, result) { 
				// if (err) throw err;
				console.log('New Orginization has been added');
			});
			var dbn = db.db(code);
			dbn.collection(code).insertOne(userInfo.user, function(err, result){
				// if (err) throw err;
				console.log("user has been added to the orginization database");
				res.redirect('/home');
			});
		}else{
			console.log("This orginization code is already in use");
			res.redirect('/home');
		}
	});
});

router.get('/join', function(req, res, next){
	res.render('joinOrginization');
});

router.post('/joinOrginization', function(req, res, next){
	var code = req.body.orginizationCode;
	var name = req.body.orginizationName;
	var newOrginization = true;
	mongo.connect(url,{ useUnifiedTopology: true }, function(err, db) {
		assert.equal(null, err);
		var dbo = db.db("orginizations");
		dbo.collection("orginizations").find({}).toArray(function(err, result) {
			if (err) throw err;
		  	for (var i = 0; i <result.length; i++){
				if (code === result[i]){
			  		newOrginization = false;
				}
			}
		});
		console.log(newOrginization);
		if(!newOrginization){
			var dbn = db.db(code);
			dbn.collection(code).insertOne(userInfo.user, function(err, result){
				// if (err) throw err;
				console.log("user has been added to the orginization database");
				res.redirect('/home');
			});
		}else{
			console.log("This orginization code is not in use");
			res.redirect('/home');
		}
	});
});
module.exports = router;