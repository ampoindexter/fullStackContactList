'use strict';

$(document).ready(init);

function init() {
  $('#submit').click(addContact);
}

function addContact() {
  var contact = {}
  contact.name = $('input#name').val();
  contact.phone = $('input#phone').val();
  contact.email = $('input#email').val();

  $('input').each(function(index, input) {
    $(input).val('');
  });

  $.post('/contacts', contact)
  .done(function(data){

    console.log("data:", data);
  })
  .fail(function(err){
    console.error(err);
  })
}

function contactRow(contact) {
  var $tr = $('<tr>');
  var $name = $('<td>').addClass('name').text(contact.name);
  var $phone = $('<td>').addClass('phone').text(contact.phone);
  var $email = $('<td>').addClass('email').text(contact.email);
  var $buttons = $('<td>');
  var $edit = $('<i>').addClass('fa fa-pencil-square-o');
  var $delete = $('<i>').addClass('fa fa-trash-o');
  $tr.append($name, $phone, $email, $edit, $delete);
  return $tr;
}


