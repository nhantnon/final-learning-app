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
      $(".panel-heading").append(response)
      $("#chat-container").animate({ scrollTop: $(document).height() }, "slow");
    })
  })

  $(document).on("keyup", "#message_content", function(event){
    if(event.keyCode === 13){
      $("#message_form").submit()
      $("#message_content").val("");
      $("#chat-container").animate({ scrollTop: $(document).height() }, "slow");
      return false
    }
  });
});

