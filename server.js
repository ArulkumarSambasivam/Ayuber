var express = require('express');
var app = express();
var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;
var MongoClient = require('mongodb').MongoClient

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.redirect('public/index.html');
});

app.get('/loginValidation',function(req,res){
	var email = req.query.email;
	var password = req.query.password;
  console.log(email);

	MongoClient.connect('mongodb://localhost:1234/db', function(err, db) {
    console.log('err'  +  err);
    db.collection('login_master', function(error, collection) {
        //collection.find({_id:justId}),function(err, docs) { // <== This will not work
        collection.findOne({email_id:email,password:password},function(err, docs) {
          
          if(docs !=null && docs.email_id == email){
           //  console.log("Printing docs from Array. count " + docs.email_id); 
            res.send("correct");
            console.log("Printing docs from Array. count " + JSON.stringify(docs)); 
          }else
          res.send("failed");
        });
  });
});

});

app.listen(8080);
