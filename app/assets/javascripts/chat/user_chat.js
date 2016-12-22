$(document).ready(function(){
  $(document).on("click", "#chat-button", function(event){
    event.preventDefault()
    var href = $("#chat-button").attr("href")
    var user_id = href.slice(10, (href.length))
    var data = {reciever_id: user_id}
    $.ajax({
      method: "GET",
      url: "/messages",
      data: data
    }).done(function(response){
      $("#chat-button").hide()
      $("#close_chat").show()
      $(".panel-heading").append(response)
      $("#message_content").focus()
      $("#chat-container").animate({ scrollTop: $("#message-board").height() }, "slow");
    })
  })

  $(document).on("keyup", "#message_content", function(event){
    if(event.keyCode === 13){
      $("#message_form").submit()
      $("#message_content").val("");
      $("#chat-container").animate({ scrollTop: $("#message-board").height() }, "slow");
      return false
    }
  });

  $(document).on("submit", "#message_form", function(){
    $("#chat-container").animate({ scrollTop: $("#message-board").height() }, "slow");
    setTimeout(function(){
      $("#message_content").val("");
    }, 100)
  })

  $(document).on("click", "#close_chat", function(){
    $(this).remove()
    $("#chat-container").remove()
    $("#message_form").remove()
    $("#chat-button").show()
  })
});

