class RegistrationsController < Devise::RegistrationsController

  def create
    super
    @user = resource
    MyMailer.welcome_email(@user).deliver_now
  end

  def after_sign_up_path_for(resource)
    "/users/#{resource.id}" # Or :prefix_to_your_route
  end


  private

  def sign_up_params
    params.require(:user).permit(:first_name, :last_name, :dob, :location, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.require(:user).permit(:first_name, :last_name, :dob, :location, :email, :password, :password_confirmation)
  end
end
