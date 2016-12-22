function ErrorController(){}

ErrorController.prototype.loginValidation = function(){
  $(document).on('submit','form#new_user',function(event){
    var url = $(this).attr('action');
    var data = $(this).serialize();
    var that = this;
    console.log(that);
    event.preventDefault();
    $.ajax({
      url: url,
      method: 'post',
      data: data
    })
    .done(function(response){
      console.log(response);
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      // document.getElementById("#login-button").disabled=false;
      // $('#login-button').removeAttr('disabled');
      console.log(jqXHR.responseText);
      $('#login-button').removeProp('disabled');
    })
  })
}

ErrorController.prototype.initialize = function(){
  this.loginValidation();
}
