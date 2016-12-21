App.chat = App.cable.subscriptions.create('ChatChannel', {
  received: function(data) {
    $("#chat-container").animate({ scrollTop: $(document).height() }, "slow");
    return $("[data-chatroom=" + data.sender.id + "_" + data.reciever.id+"]").append("<li class='user_one_message'>" + "<div id='user_one_message'>" + "<b>"+ data.username + "</b>" + ": " + data.content + "</div>" + "</li>") &&  $("[data-chatroom=" + data.reciever.id + "_" + data.sender.id+"]").append("<li class='user_two_message'>" + "<div id='user_two_message'>" + "<b>"+ data.username + "</b>" + ": " + data.content + "</div>" + "</li>")

  }

  // function appendBothChats(senderId, recieverId){

  // }
})
