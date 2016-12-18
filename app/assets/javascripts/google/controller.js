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
    // that.currentPins = responses;
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    styles: [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 33
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2e5d4"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c5dac6"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c5c6c6"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e4d7c6"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fbfaf7"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#acbcc9"
            }
        ]
    }
]
  });
    var geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder, map, responses, onePerZip(responses));
  })

}
function returnUserByZip(responses, zip){
  var users = []
  responses.forEach(function(user){
    if(user.location === zip){
      users.push(user)
    }
  })
  return users
}

Array.prototype.contains = function(v) {
  for(var i = 0; i < this.length; i++){
    if(this[i] === v) return true;
  }
  return false;
}

function onePerZip(responses){
 // var zips = responses.map(function(response){return response.location})
 var zips = []
 var users = []
 for(var i = 0; i < responses.length; i++){
  if(!zips.contains(responses[i].location)){
    zips.push(responses[i].location);
  }
 }
 return zips
}


function geocodeAddress(geocoder, resultsMap, responses, zips) {
  var currentPins = responses;
  for(var i = 0; i < zips.length; i++) {
    var x = 0;
    // var contentString = '<h1>' + currentPins[i].first_name + '</h1>';
    geocoder.geocode({'address': zips[i]}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var infowindow = new google.maps.InfoWindow({
          maxWidth: 300
        });
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
          // info: contentString
        });
        // console.log(currentPins)
        // console.log(responses)
        var html = '<h1>' + returnUserByZip(responses, zips[x]).length + '</h1>';
          // '<div id="bodyContent">'
          // '<p>' + currentPins[x].email + '</p>' +
          // '<p>' + currentPins[x].location + '</p>' +
          // '<p><a href="/users/' + currentPins[x].id + '">Learn more about ' + currentPins[x].first_name + '\'s skills!</a></p>';

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
