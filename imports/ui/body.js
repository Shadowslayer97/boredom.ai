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
  'click button': function() {
    // Message
    var messageDict = {
      text: document.getElementById('message').value,
      orientation: "right",
      img: "right.png"
    }

    chatArr.push(messageDict);
    console.log(messageDict);
  },
})
