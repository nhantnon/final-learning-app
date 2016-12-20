App.chat = App.cable.subscriptions.create('ChatChannel', {  
  received: function(data) {
    return $("#message-board").append("<li>" + data.username + ": " + data.content + "</li>")
    // return console.log("Poop")
  }
})