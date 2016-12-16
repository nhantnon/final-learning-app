class User < ActiveRecord::Base
  has_many :courses, foreign_key: :teacher_id
  has_many :sessions_students, foreign_key: :student_id
  has_many :sessions, through: :sessions_students



  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
