'use strict';

var fs = require('fs');

var Contact = {};

var db = 'db/contacts.json';

Contact.find = function(cb) {
  fs.readFile(db, function(err, data){
    if(err) return cb(err);
    var contacts = JSON.parse(data);
    cb(null, contacts);
  });
};

Contact.create = function(contact, cb) {
  Contact.find(function(err, contacts){
    contacts.push(contact);
    var data = JSON.stringify(contacts);
    fs.writeFile(db, data, cb);
  });
}

module.exports = Contact;