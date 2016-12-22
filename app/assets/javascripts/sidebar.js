$(document).ready(function(){
  $("#sidebar-peek").hover(function(){
    $(this).css("opacity", ".7")
  },function(){
    $(this).css("opacity", "1")
  })

  $("#sidebar-peek").on("click", function(){
    $(this).hide()
    $("#sidebar-full").show("slide", {direction: "left"}, 500)
  })

  $("#sidebar-full").mouseleave("click", function(){
    $(this).hide("slide", {direction: "left"}, 500)
    $("#sidebar-peek").show()
  })

  $("#step-one").hover(function(){
    $(this).css("opacity", ".5")
    $("#select-skill").css("background-color", "#59A5D8")
  },function(){
    $(this).css("opacity", "1")
    $("#select-skill").css("background-color", "#fff")
  })

  $("#step-two").hover(function(){
    $(this).css("opacity", ".5")
    $("#search-input").css("background-color", "#59A5D8")
  },function(){
    $(this).css("opacity", "1")
    $("#search-input").css("background-color", "#fff")
  })

  $("#step-three").hover(function(){
    $(this).css("opacity", ".5")
    $("#submit-skill").css("background-color", "#59A5D8")
    $("#search-example").fadeIn()

  },function(){
    $(this).css("opacity", "1")
    $("#submit-skill").css("background-color", "#fff")
    $("#search-example").fadeOut()
  })
})
