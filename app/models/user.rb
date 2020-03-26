class User < ApplicationRecord

  require 'validation_helpers'

  attr_reader :password

  validates :username, :name, :email, :password_digest, :session_token, presence: true
  validates :username, :email, uniqueness: true
  validates :username, length: { minimum: 6, maximum: 30 }, valid_username: true
  validates :name, length: { minimum: 2, maximum: 50 }
  validates :email, valid_email: true
  validates :password, length: { minimum: 8, maximum: 30 }, secure_password: true, allow_nil: true
  validates :bio, length: { maximum: 255 }, allow_nil: true

  after_initialize :ensure_session_token

  def self.find_by_credentials(login_input, password)
    user = login_input.include?("@") ? User.find_by(email: login_input) :
      User.find_by(username: login_input)

    user && user.is_password?(password) ? user : nil
  end

  # def email=(email)
  #   parts = email.split("@")
  #   parts[0].gsub!('.','')
  #   parts[0] = parts[0].split('+')[0]
  #   @email = parts.join('@')
  # end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

end