class Course < ActiveRecord::Base
  belongs_to :user, foreign_key: teacher_id
end