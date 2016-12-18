function Controller(){
  this._model = new Model();
  this._view = new View();
  this.currentPins = new Array;
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
    that.currentPins = responses;
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8
  });
    var geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder, map, responses);
  })

}

function geocodeAddress(geocoder, resultsMap, responses) {
  var currentPins = responses;
  for(var i = 0; i < currentPins.length; i++) {
    var x = 0;
    var contentString = '<h1>' + currentPins[i].first_name + '</h1>';
    geocoder.geocode({'address': currentPins[i].location}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var infowindow = new google.maps.InfoWindow({
          maxWidth: 300
        });
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
          info: contentString
        });
        var html = '<h1>' + currentPins[x].first_name + " " + currentPins[x].last_name + '</h1>' +
          '<div id="bodyContent">' +
          '<p>' + currentPins[x].email + '</p>' +
          '<p>' + currentPins[x].location + '</p>' +
          '<p><a href="/users/' + currentPins[x].id + '">Learn more about ' + currentPins[x].first_name + '\'s skills!</a></p>';

        bindInfoWindow(marker, map, infowindow, html);
        x ++;
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}
function bindInfoWindow(marker, map, infowindow, html) {
  marker.addListener('click', function(){
    infowindow.setContent(html);
    infowindow.open(map, this)
  })
}

function initMap() {


  var styledMapType = new google.maps.StyledMapType([{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}])



  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15
  });
  var geocoder = new google.maps.Geocoder();
  var infoWindow = new google.maps.InfoWindow({map: map});
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  }
}


Controller.prototype.initialize = function(){
  this.handlePins();
}
