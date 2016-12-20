class UsersController < ApplicationController

  def show
    puts params.inspect
    @user = User.find(params[:id])
  end

  def profile
    @user = User.find(params[:id])
    if !(user_signed_in? && @user == current_user)
      redirect_to :root
    end
  end

  def update
    @user = User.find(params[:id])
    if user_signed_in? && @user == current_user
      @user.update(account_update_params)
      if @user.save
        redirect_to :root
      end
    else
      @errors = @user.errors.full_messages
      redirect_to user_show_path
    end
  end

  private

  def account_update_params
    params.require(:user).permit(:first_name, :last_name, :dob, :location, :email, skill_ids: [])
  end


end
