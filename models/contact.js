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

Contact.put = function(remainder, cb) {
  // console.log("remainder", remainder);
  if (remainder.hasData()) {
    var contactList = JSON.stringify(remainder.data);
  } else {
    remainder.data = [];
    var contactList = remainder.data;
  }
  fs.writeFile(db, contactList, cb);
}

module.exports = Contact;