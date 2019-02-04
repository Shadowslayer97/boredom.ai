import { Meteor } from 'meteor/meteor';
var apiai = require('apiai');

Meteor.startup(() => {
  // code to run on server at startup
});

var app = apiai("56ad813f1beb4cdd96b9c64886434add");

var request = app.textRequest('what is your name?', {
    sessionId: 'aidhuojas2kwe2sda'
});

request.on('response', function(response) {
    console.log(response.result.fulfillment.speech);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
