import { Meteor } from 'meteor/meteor';
var apiai = require('apiai');

Meteor.startup(() => {
  // code to run on server at startup
});

var app = apiai("56ad813f1beb4cdd96b9c64886434add");

Meteor.methods({
  'userRequest': function(userRequest) {
    console.log(userRequest.userText);
    return new Promise(function(resolve,reject){
      var request = app.textRequest(userRequest.userText, {
          sessionId: 'aidhuojas2kwe2sda'
      });
      request.on('response', function(response) {
          console.log(response.result.fulfillment.speech);
          resolve(response.result.fulfillment.speech);
      });
      request.on('error', function(error) {
          console.log(error);
          reject(error);
          // return "Im malfunctioning...cyber apocalypse is here!! >:D ";
      });
      request.end();
    })
  }
})
