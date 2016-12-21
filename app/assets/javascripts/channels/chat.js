App.chat = App.cable.subscriptions.create('ChatChannel', {
  received: function(data) {
    $("#chat-container").animate({ scrollTop: $(document).height() }, "slow");
    return $("[data-chatroom=" + data.sender.id + "_" + data.reciever.id+"]").append("<li>" + "<b>"+ data.username + "</b>" + ": " + data.content + "</li>") &&  $("[data-chatroom=" + data.reciever.id + "_" + data.sender.id+"]").append("<li>" + data.username + ": " + data.content + "</li>")

  }

  // function appendBothChats(senderId, recieverId){

  // }
})
