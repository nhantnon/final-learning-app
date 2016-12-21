class HomepageController < ApplicationController

  def index
    @users = User.all
    @skills = Skill.all
    if request.xhr?
      return render json: @users
    end
    render "/homepage/index"
  end

  def users_skill
    @skill = Skill.find_by(name: params[:skill])
    @users = @skill.users
    if request.xhr?
      return render json: @users
    end
  end

end


