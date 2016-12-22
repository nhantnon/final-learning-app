var markersArray = [];

function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}

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

Controller.prototype.returnUserByZip = function(responses, zip, skill){
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
    navigator.geolocation.getCurrentPosition( function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log(pos)
      map.setCenter(pos);
      map.setZoom(12);
    }, function(position){
      var pos = {
        lat: 39.8282,
        lng: -98.5795
      };
      console.log(pos)
      map.setCenter(pos);
      map.setZoom(4);
  })
  }



Controller.prototype.getPopUp = function(){
  $(document).on('click','a.list_popup_open',function(event){
    event.preventDefault();
    var skill = $('#select-skill').val();
    var url = $(this).find('a.list_popup_open').context.href;
    // $('#list_popup').addClass('hide');
    $.ajax({
      url: url+'?skill='+skill,
      method: 'get'
    })
    .done(function(response){

      $('#list_popup').html(response);
      // $('#list_popup').removeClass('hide');
    })
  })
}

Controller.prototype.getLoginPopUp = function(){
  $(document).on('click','a#login-link',function(event){
    event.preventDefault();
    // $('#login_popup').hide();
    // console.log($(this).attr('href'));
    // var url = $(this).attr('href');
    // $.ajax({
      // url: url,
      // method: 'get'
    // })
    // .done(function(response){
      // var array = $.parseHTML(response);
      // var result = $(array).filter("#login-pad")[0];
      // $('#login_popup').html(result);
      // $('#login_popup').show();
    // })
  })
}

Controller.prototype.getRegisterPopUp = function(){
  $(document).on('click','a#register-link',function(event){
    event.preventDefault();
    // var url = $(this).attr('href');
    // $.ajax({
    //   url: url,
    //   method: 'get'
    // })
    // .done(function(response){
    //   var array = $.parseHTML(response);
    //   var result = $(array).filter("#register-pad")[0];
    //   $('#register_popup').html(result);
    // })
  })
}


Controller.prototype.geocodeAddress = function(geocoder, responses, zips) {
  var currentPins = responses;
  var that = this;
  var map = this.map;

  for(var i = 0; i < zips.length; i++) {
    var x = 0;
    this.geocoder.geocode({'address': zips[i]}, function(results, status) {
      if (status === 'OK') {
        var html = '<h1>' + that.returnUserByZip(responses, zips[x]).length + '</h1>' +
          '<h2><a class=list_popup_open href="/searches/' + zips[x] + '">Take a look!</a><h2>'

        that.bindInfoWindow(that.getView().marker(map,results[0]), that.getView().infoWindow(), html);
        x ++;
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
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

// function returnCurrentZip(){
//   navigator.geolocation.getCurrentPosition( function(position) {
//     var pos = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     };
//     $.ajax({url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.lat + ',' + pos.lng + '', method: "GET"})
//     .done(function(response){
//       return (response.results[0].address_components[7].long_name);
//     })
//   });
// }



Controller.prototype.searchBySkill = function(skill){
  var that = this;
  console.log("searching by skill...");
  console.log(skill);
  var input = $('#search-input').val();
  var closestZipToMap = new Array;
  var skill_selected = document.getElementById("select-skill").value;
  clearOverlays(); // clears all markers from map
  var closestZips = new Array;
  var zipsToMap;
  var ajaxPromise = that.getModel().getPinsBySkill(formatSkill(skill));
  function formatSkill(skill){
    return {skill: skill};
  }

  var distance = 5;
  $.ajax( {
    method: 'GET',
    url:'https://www.zipcodeapi.com/rest/js-nP5m53NhaSPHoEmKqleDPXjY34d2NpDaeIxjLkBWdqDB50mvlA9byt9BxnElMhw1/radius.json/'+input+'/'+distance+'/miles?minimal'
  } )
  .done(function(responses){
    for(var i in responses.zip_codes){
      closestZips.push(responses.zip_codes[i])
    }

      ajaxPromise.done(function(responses2){
        zipsToMap = that.onePerZip(responses2);
        console.log(zipsToMap);

        for(var i = 0; i < zipsToMap.length; i++){
          if(closestZips.includes(zipsToMap[i])){
            closestZipToMap.push(zipsToMap[i])
          }
        }
        that.geocodeAddress(that.geocoder, responses2, closestZipToMap)
      })
  })
  that.getPosition(input);
}

Controller.prototype.closePopUp = function(){
  $(document).on('click', 'a.user_link', function(e){
    e.preventDefault();
    var userPage = $(this).attr('href');
    window.location.href = userPage;
  })
}


Controller.prototype.findZip = function(){
  var that = this;
  if (document.getElementById('search-input').value){
    var inputBox = document.getElementById('search-input');
  } else {
    var inputBox;
    navigator.geolocation.getCurrentPosition( function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      $.ajax({url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.lat + ',' + pos.lng, method: "GET"})
      .done(function(response){
        inputBox = (response.results[0].address_components[7].long_name);



        clearOverlays(); // clears all markers from map
        var closestZips = new Array;
        var zipsToMap;
        var ajaxPromise = that.getModel().getPins();
        var closestZipToMap = new Array;


        var distance = 5;
        $.ajax( {
          method: 'GET',
          url:'https://www.zipcodeapi.com/rest/js-GndwNs6mvC77crir2652doTpHAR0LTLrgYX3r4pXHx4TYml1tq3HOX6wyYxjRiK7/radius.json/'+inputBox+'/'+distance+'/miles?minimal'
        } )
        .done(function(responses){
          for(var i in responses.zip_codes){
            closestZips.push(responses.zip_codes[i])
          }

            ajaxPromise.done(function(responses2){
              zipsToMap = that.onePerZip(responses2);

              for(var i = 0; i < zipsToMap.length; i++){
                if(closestZips.includes(zipsToMap[i])){
                  closestZipToMap.push(zipsToMap[i])
                }
              }
              that.geocodeAddress(that.geocoder, responses2, closestZipToMap)
            })
        })
      })
    });
  }

  $('#search-input').keypress(function(event){

    var input = $('#search-input').val();
    var closestZipToMap = new Array;
    var skill_selected = document.getElementById("select-skill").value;


    if(event.which == 13 && skill_selected === "All"){
      clearOverlays(); // clears all markers from map
      var closestZips = new Array;
      var zipsToMap;
      var ajaxPromise = that.getModel().getPins();


      var distance = 5;
      $.ajax( {
        method: 'GET',
        url:'https://www.zipcodeapi.com/rest/js-xajS0POOeO3ei2dGKgJSBq6k4NEdmrCUBVMCLAqZpueHwrngH79jxfEB2iPpJrjl/radius.json/'+input+'/'+distance+'/miles?minimal'
      } )
      .done(function(responses){
        for(var i in responses.zip_codes){
          closestZips.push(responses.zip_codes[i])
        }

          ajaxPromise.done(function(responses2){
            zipsToMap = that.onePerZip(responses2);

            for(var i = 0; i < zipsToMap.length; i++){
              if(closestZips.includes(zipsToMap[i])){
                closestZipToMap.push(zipsToMap[i])
              }
            }
            that.geocodeAddress(that.geocoder, responses2, closestZipToMap)
          })
      })
    that.getPosition(input);
    } else if (event.which == 13 && skill_selected != "All") {
      that.searchBySkill(skill_selected);
    }
  })
}

Controller.prototype.initMap = function() {
  var that = this;
  this.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    styles: this.getView().mapStyles(),
    backgroundColor: 'none'
  });
  this.getCurrentPos();
}

Controller.prototype.initListPopup = function(){
  $('#list_popup').popup({
    opacity: 0.3,
    transition: 'all 0.3s',
    scrolllock: true
  });
}

Controller.prototype.initLogInPopup = function(){
  $('#login_popup').popup({
    outline: true, // optional
    focusdelay: 400, // optional
    vertical: 'top' //optional
  });
}

Controller.prototype.initRegisterPopup = function(){
  $('#register_popup').popup({
    outline: true, // optional
    focusdelay: 400, // optional
    vertical: 'top' //optional
  });
}

Controller.prototype.beforeLoader = function(){
  // google.maps.event.addListenerOnce(this.map, 'idle', function(){
    $('.scene').removeClass('hide');
  // });
}

Controller.prototype.afterLoader = function(){
  google.maps.event.addListenerOnce(this.map, 'tilesloaded', function(){
    $('.scene').addClass('hide');
  });
}


Controller.prototype.initialize = function(){
  if(window.location.pathname == '/'){
    this.initMap();
    this.findZip();
    this.beforeLoader();
    this.afterLoader();
    this.initListPopup();
    this.getPopUp();
  }
  this.initLogInPopup();
  this.getLoginPopUp();
  this.initRegisterPopup();
  this.getRegisterPopUp();
  this.closePopUp();

}
