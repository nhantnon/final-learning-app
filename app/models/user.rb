class User < ActiveRecord::Base
  has_many :courses, class_name: User


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
