'use strict';

$(document).ready(init);

function init() {
  $('#submit').click(addContact);
  $('.delete').click(deleteContact);
}

function getContacts(cb) {
  $.get('/all')
  .done(function(data) {
    console.log(data);
    cb(data);
  })
  .fail(function(err){
    console.log(err);
  });
}

function updateTable() {
  $('#contactList').empty();
  var rows = getContacts().map(function(contact, index) {
    contactRow(contact);
  });
}

function deleteContact(e) {
  var $target = $(e.target);
  var $targetRow = $target.closest('tr');
  var i = $targetRow.index();
  $targetRow.empty();

  getContacts(function(data) {
    data.splice(i,1);
    $.post('/delete', {data: data})
      .done(function(opp) {
        console.log(opp)
      })
      .fail(function(err){
        console.log(err);
    });
  })
}

function addContact() {
  var contact = {}
  contact.name = $('input#name').val();
  contact.phone = $('input#phone').val();
  contact.email = $('input#email').val();
  $('input').each(function(index, input) {
    $(input).val('');
  });

  $.post('/', contact)
  .done(function(data){
    console.log("data:", data);
    var $contactRow = contactRow(contact);
    $('#contactList').append($contactRow);
  })
  .fail(function(err){
    console.error(err);
  });
}

function contactRow(contact) {
  var $tr = $('<tr>');
  var $name = $('<td>').addClass('name').text(contact.name);
  var $phone = $('<td>').addClass('phone').text(contact.phone);
  var $email = $('<td>').addClass('email').text(contact.email);
  var $editTd = $('<td>').addClass('edit text-center');
  var $editIcon = $('<i>').addClass('fa fa-pencil-square-o fa-lg');
  $editTd.append($editIcon);
  var $deleteTd = $('<td>').addClass('delete text-center');
  var $deleteIcon = $('<i>').addClass('fa fa-trash-o fa-lg');
  $deleteTd.append($deleteIcon);
  $tr.append($name, $phone, $email, $editTd, $deleteTd);
  return $tr;
}


