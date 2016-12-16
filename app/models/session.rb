class Session < ActiveRecord::Base
  belongs_to :course
  has_many :sessions_students
  has_many :students, through: :sessions_students, class_name: User
end
