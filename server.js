
var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING|| 'mongodb://dude439:1zxcvbnm@ds239217.mlab.com:39217/simon-says', function() {
  console.log("DB connection established!!!");
})
var highScoreM = require('./models/model')

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
  res.sendFile('/templates/home.html');
});

app.get('/simon', function(req, res){
  res.sendFile('/templates/simon.html');
});

app.get('/scores', function(req, res){
  highScoreM.find(function(err, result){
    if(err){
     throw (err)
    }else{       
      res.send(result)
      }   
  })
})

app.put('/highScore/:id', function(req,res){
  var highScore = {
    name: req.body.name,
     score: req.body.score
  }
  highScoreM.update({_id : req.params.id}, highScore , function(err, result){
    if(err){
      console.log(err)
    }
   console.log(result)
    res.send("result")
});
})

app.listen(process.env.PORT || 8000, function() {
    console.log("yo yo yo, on 8000!!")
  })