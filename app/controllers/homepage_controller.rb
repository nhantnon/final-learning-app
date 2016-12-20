class HomepageController < ApplicationController

  def index
    @users = User.all
    @skills = Skill.all
    if request.xhr?
      return render json: @users
    end
    render "/homepage/index"
  end

end


