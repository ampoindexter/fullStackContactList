'use strict';

var PORT = process.env.PORT || 3000;

var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');

var app = express();

app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', require('./routes/contacts'));

app.get('/', function(req, res){
  res.render('contacts');
});

app.get(function(req, res){
  res.status(404).render('404');
});

app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});