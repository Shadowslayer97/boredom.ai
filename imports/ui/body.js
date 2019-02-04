import { Template } from 'meteor/templating';

import './body.html';

Template.chatItem.helpers({
  chats(){
      return [
      { text:"Hello there bot", orientation:"right" },
      { text:"Hello User", orientation:"left" },
      { text:"Hmm", orientation:"right" }
    ]
  }
})
