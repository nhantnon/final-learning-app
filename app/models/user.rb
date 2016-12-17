class User < ActiveRecord::Base
  has_many :user_skills
  has_many :skills, through: :user_skills

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
