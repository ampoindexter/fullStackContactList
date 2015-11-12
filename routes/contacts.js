'use strict';

var express = require('express');
var router = express.Router();

var Contact = require('../models/contact');

router.get('/', function(req, res) {
  Contact.find(function(err, contacts){
    if(err) return res.status(400).send(err);
    res.render('index', {title: 'My Contacts!', items: contacts || [{}] });
  });
});

router.get('/all', function(req, res) {
  Contact.find(function(err, contacts){
    if(err) return res.status(400).send(err);
    res.send(contacts);
  });
});

router.post('/', function(req, res) {
  var contact = req.body;
  Contact.create(contact, function(err) {
    res.status(err ? 400 : 200).send(err || 'contact created');
  });
});

router.post('/delete', function(req, res) {
  // console.log("req.body!!!", req.body);
  Contact.put(req.body, function(err) {
    res.status(err ? 400 : 200).send(err || 'contact updated');
  });
});


module.exports = router;
