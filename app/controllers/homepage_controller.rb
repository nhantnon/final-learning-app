class HomepageController < ApplicationController

  def index
    @users = User.all
    if request.xhr?
      return render json: @users
    end
    render "/hompage/index"
  end
end
