class SearchesController < ApplicationController

  def show
    @users = User.find_users_from_zip(params[:zip])
  end

end
