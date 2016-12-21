class SearchesController < ApplicationController

  def show
    @users = User.find_users_from_zip(params[:zip])

    p "this is the skill!! ------------------ #{params[:skill]}"

    if params[:skill] != "All"
      @user_select = @users.select do |user|
        skill = Skill.find_by(name: params[:skill])
        user.skills.include? skill
      end
    else
      @user_select = @users
    end

    if request.xhr?
      render layout: false
    end
  end

end
