import { Template } from 'meteor/templating';

import './body.html';

var chatArr = new ReactiveArray([
    { text:"Hello there bot", orientation:"right",img:"right.png" },
    { text:"Hello User", orientation:"left",img:"right.png" },
    { text:"Hmm", orientation:"right",img:"right.png" }
  ]);

Template.chatList.onCreated(function chatListOnCreated() {
})

Template.chatList.helpers({
  chats: function() {
    return chatArr.list();
  }
});

Template.chatForm.helpers({
  message() {
    return Template.instance().message.get();
  }
})

Template.chatForm.events({
  'click #send-message': function() {
    // Message
    var userText = document.getElementById('message').value;
    var messageDict = {
      text: userText,
      orientation: "right",
      img: "right.png"
    }
    chatArr.push(messageDict);
    Meteor.call('userRequest',{userText:userText},function(error,result){
      if(error) console.log(error);
      console.log(result);
      var messageDict = {
        text: result,
        orientation: "left",
        img: "left.png"
      }
      console.log(result);
      chatArr.push(messageDict);
    });
  },
  'click #trial': function() {
    Meteor.call('movieRequest','tangled',function(error,result){
      if(error) console.log(error)
      console.log(result);
    })
  }
});


// helper functions
