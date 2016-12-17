class MyMailer < ApplicationMailer
  default from: "coryrmathis@gmail.com"
  def welcome_email(user)
    @user = user
    mail(to: @user.email,
         subject: "Welcome to Level Up!",
         template_path: "my_mailer",
         template_name: "welcome_email")
  end

end
