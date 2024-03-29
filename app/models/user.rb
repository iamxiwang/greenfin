# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password
  
  validates :username, 
    uniqueness: true, 
    length: { in: 3..30 }, 
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }

  validates :email, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }

  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true


  before_validation :ensure_session_token

  has_many :comments,
    foreign_key: :author_id,
    class_name: :Comment

  has_many :tours,
    foreign_key: :user_id,
    class_name: :Appointment

  has_many :likes,
    foreign_key: :user_id,
    class_name: :Like

  has_one_attached :img

  # SPIRE

  def self.find_by_credentials(credential, password)
    if credential.match(URI::MailTo::EMAIL_REGEXP)
      user = User.find_by(email: credential)
    else  
      user = User.find_by(username: credential)
    end

    if user && user.authenticate(password)
      return user 
    else 
      return nil 
    end
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    pass = BCrypt::Password.new(password_digest)
    pass.is_password?(password)

  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    # self.save!
    self.session_token
  end 

  private
  def generate_unique_session_token
    token = SecureRandom::urlsafe_base64 
    while User.exists?(session_token: token)
      token = SecureRandom::urlsafe_base64 
    end
    return token
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

end
