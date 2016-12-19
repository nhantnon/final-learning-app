class User < ActiveRecord::Base
  has_many :user_skills
  has_many :skills, through: :user_skills

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def self.find_users_from_zip(zip)
    users = []
    self.all.each do |user|
      if user.location == zip
        users << user
      end
    end
    return users
  end

end
