function Model(){}

Model.prototype.getPins = function(){
  var allCurrentPins = $.ajax({url:"/", dataType: "json", method:"GET", cache: false});
  return allCurrentPins;
}
