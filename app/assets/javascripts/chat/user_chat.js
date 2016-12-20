$(document).ready(function(){
  $("#chat-button").on("click", function(event){
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
    })
  })
});

