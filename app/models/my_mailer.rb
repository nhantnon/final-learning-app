class MyMailer < Devise::MyMailer
  helper :application
  default template_path: 'devise/mailer'
end
