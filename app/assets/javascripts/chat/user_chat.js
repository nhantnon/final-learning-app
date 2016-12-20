$(document).ready(function(){
  $("#chat-button").on("click", function(event){
    event.preventDefault()
    $.ajax({
      method: "GET",
      url: "/messages"
    }).done(function(response){
      $("#chat-button").hide()
      $(".panel-heading").append(response)
    })
  })
});

