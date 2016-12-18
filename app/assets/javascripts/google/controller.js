function Controller(){
  this._model = new Model();
  this._view = new View();
  this.currentPins = new Array;
  this.geocoder = new google.maps.Geocoder();
  this.map;
}

Controller.prototype.getView = function(){
  return this._view;
}

Controller.prototype.getModel = function(){
  return this._model;
}

Controller.prototype.handleInitPins = function(){
  var ajaxPromise = this.getModel().getPins();
  var that = this;
  ajaxPromise.done(function(responses){
    that.geocodeAddress(that.geocoder, responses, that.onePerZip(responses));
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

Controller.prototype.bindInfoWindow = function(marker, infowindow, html) {
  var that = this;
  marker.addListener('click', function(){
    infowindow.setContent(html);
    infowindow.open(that.map, this)
  })
}


Controller.prototype.getCurrentPos = function(){
  var that = this;
  var map = this.map;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
      map.setZoom(12);
    });
  }
}


Controller.prototype.geocodeAddress = function(geocoder, responses, zips) {
  var currentPins = responses;
  var that = this;
  var map = this.map;

  for(var i = 0; i < zips.length; i++) {
    var x = 0;
    this.geocoder.geocode({'address': zips[i]}, function(results, status) {
      if (status === 'OK') {
        // map.setCenter(results[0].geometry.location);
        var html = '<h1>' + that.returnUserByZip(responses, zips[x]).length + '</h1>';
        that.bindInfoWindow(that.getView().marker(map,results[0]), that.getView().infoWindow(), html);
        x ++;
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    that.getCurrentPos();
  }
}


Controller.prototype.getPosition = function(input){
  var that = this;
  this.geocoder.geocode( { 'address': input}, function(results, status) {
    if (status == 'OK') {
      var pos = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng()
      }
      that.map.setCenter(pos);
      that.map.setZoom(12);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

Controller.prototype.findZip = function(){
  var that = this;
  var inputBox = document.getElementById('pac-input');

  // Below code positions the input bar in the map
  // that.map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputBox);

  $('#pac-input').keypress(function(event){
    var searchBox = new google.maps.places.SearchBox(inputBox);
    var input = $('#pac-input').val();
    if(event.which == 13){
      that.getPosition(input);
    }
  })
}

Controller.prototype.initMap = function() {
  var that = this;
  this.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    styles: this.getView().mapStyles()
  });
}

Controller.prototype.initialize = function(){
  if(window.location.pathname == '/'){
    this.initMap();
    this.handleInitPins();
    this.findZip();
  }
}
