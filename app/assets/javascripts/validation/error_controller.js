function ErrorController(){}

ErrorController.prototype.loginValidation = function(){
  $(document).on('submit','form#new_user',function(event){
    var url = $(this).attr('action');
    var data = $(this).serialize();
    var that = this;

    event.preventDefault();
    $.ajax({
      url: url,
      method: 'post',
      data: data
    })
    .done(function(response){
      if(!($('#login-error').hasClass('hide'))){
        $('#login-error').addClass('hide');
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      $('#login-button').removeAttr('disabled');
      $('#login-button').removeAttr('data-disable-with');
      $('.error-msg').text(jqXHR);
      $('#login-error').removeClass('hide');
    })
  })
}

ErrorController.prototype.registerValidation = function(){
  $(document).on('submit','form#new_user',function(event){
    var url = $(this).attr('action');
    var data = $(this).serialize();
    var that = this;
    event.preventDefault();

    $.ajax({
      url: url,
      method: 'post',
      data: data
    })
    .done(function(response){
      if(!($('#register-error').hasClass('hide'))){
        $('#register-error').addClass('hide');
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      $('#register-button').removeAttr('disabled');
      $('#register-button').removeAttr('data-disable-with');
      $('.register-error-msg').text("Invalid Register");
      $('#register-error').removeClass('hide');
    })
  })
}

ErrorController.prototype.initialize = function(){
  this.loginValidation();
  this.registerValidation();
}
