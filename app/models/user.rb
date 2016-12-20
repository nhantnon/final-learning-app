class User < ActiveRecord::Base
  has_many :user_skills
  has_many :skills, through: :user_skills
  has_many :sent_messages, class_name: Message, foreign_key: :sender_id
  has_many :recieved_messages, class_name: Message, foreign_key: :reciever_id

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
