class User < ActiveRecord::Base
  has_many :user_skills
  has_many :skills, through: :user_skills
  has_many :sent_messages, class_name: Message, foreign_key: :sender_id
  has_many :recieved_messages, class_name: Message, foreign_key: :reciever_id
  has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>"},:default_url => lambda { |av| ":style/missing_#{av.instance.default_image_number}.png" },  path: 'public/system/:class/:hash.:extension', url: '/system/:class/:hash.:extension', hash_secret: 'abfa04a42c94f58d17a509bccb2276d2f2e1718e23de5f0ff4bc93b4c922c2dbd23f81b31a7932fbf4424c95f14e055639d2376f8b3cb40ebf91ea4682197645'
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
# default_url: ":style/missing.png",
  validates_attachment_size :image, less_than: 2.megabytes

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

  def default_image_number
    id.to_s.last
  end

end
