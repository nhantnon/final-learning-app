function View(){}

View.prototype.mapStyles = function(){
  return [
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
}

View.prototype.getMap = function(){
  return this.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    styles: this.mapStyles()
  });
}

View.prototype.infoWindow = function(){
  return new google.maps.InfoWindow({
    maxWidth: 300
  });
}

View.prototype.marker = function(resultsMap,result){
  return new google.maps.Marker({
    map: resultsMap,
    position: result.geometry.location
  });
}
