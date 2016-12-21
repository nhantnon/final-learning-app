function Model(){}

Model.prototype.getPins = function(){
  var allCurrentPins = $.ajax({url:"/", dataType: "json", method:"GET", cache: false});
  return allCurrentPins;
}

Model.prototype.getPinsBySkill = function(skill){
  var allCurrentPins = $.ajax({url: "/users_skill", method:"GET", data: skill, cache: false});
  return allCurrentPins;
}
