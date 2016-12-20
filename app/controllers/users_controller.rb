class UsersController < ApplicationController

  def show
    puts params.inspect
    @user = User.find(params[:id])
  end

end
