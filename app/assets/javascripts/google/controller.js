function Controller(){
  this._model = new Model();
  this._view = new View();
  this.currentPins = new Array;
  this.geocoder = new google.maps.Geocoder();
  // this.map = new google.maps.Map(document.getElementById('map'), {});
}

Controller.prototype.getView = function(){
  return this._view;
}

Controller.prototype.getModel = function(){
  return this._model;
}

Controller.prototype.handlePins = function(){
  var ajaxPromise = this.getModel().getPins();
  var that = this;
  ajaxPromise.done(function(responses){
    that.geocodeAddress(that.geocoder, that.getView().getMap(), responses, that.onePerZip(responses));
  })
}

Controller.prototype.returnUserByZip = function(responses, zip){
  var users = []
  responses.forEach(function(user){
    if(user.location === zip){
      users.push(user)
    }
  })
  return users
}

Array.prototype.contains = function(location) {
  for(var i = 0; i < this.length; i++){
    if(this[i] === location) return true;
  }
  return false;
}

Controller.prototype.onePerZip = function(responses){
  var zips = []
  var users = []
  for(var i = 0; i < responses.length; i++){
    if(!zips.contains(responses[i].location)){
      zips.push(responses[i].location);
    }
  }
  return zips
}

Controller.prototype.bindInfoWindow = function(marker, map, infowindow, html) {
  marker.addListener('click', function(){
    infowindow.setContent(html);
    infowindow.open(map, this)
  })
}

Controller.prototype.geocodeAddress = function(geocoder, resultsMap, responses, zips) {
  var currentPins = responses;
  var that = this;
  for(var i = 0; i < zips.length; i++) {
    var x = 0;
    geocoder.geocode({'address': zips[i]}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var html = '<h1>' + that.returnUserByZip(responses, zips[x]).length + '</h1>';
        that.bindInfoWindow(that.getView().marker(resultsMap,results[0]), map, that.getView().infoWindow(), html);
        x ++;
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}


Controller.prototype.initMap = function() {
  var map = this.getView().getMap()
  var infoWindow = new google.maps.InfoWindow({map: map});

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition( function(position) {
  //
  //     var pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };
  //
  //     infoWindow.setPosition(pos);
  //     infoWindow.setContent('Location found.');
  //     map.setCenter(pos);
  //   }, function() {
  //     handleLocationError(true, infoWindow, map.getCenter());
  //   });
  // }
}



Controller.prototype.initialize = function(){
  this.initMap();
  this.handlePins();
}
