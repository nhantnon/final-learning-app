App.chat = App.cable.subscriptions.create('ChatChannel', {
  received: function(data) {
    $("#chat-container").animate({ scrollTop: $(document).height() }, "slow");
    return $("#message-board").append("<li>" + data.username + ": " + data.content + "</li>")
  }
})
