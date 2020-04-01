load 'validation_helpers.rb'

class User < ApplicationRecord  
  
  attr_reader :password

  # check make sure username, name, email, password_digest, and session_token are present
  validates :username, :name, :email, :password_digest, :session_token, presence: true

  # check to make sure username and email have not been registered
  validates :username, uniqueness: { case_sensitive: false }
  validates :email, uniqueness: { case_sensitive: false }

  # check to make sure username is at least 6 chars, and at most 30, and is only allowed chars
  # valid_username is custom validation method
  validates :username, length: { minimum: 4, maximum: 30 }, valid_username: true

  # enforces name length between 2 and 50 chars
  validates :name, length: { minimum: 2, maximum: 50 }

  # check to make sure email is valid, valid_email is custom validation method
  validates :email, valid_email: true

  # check to make sure password is between 8 and 30 chars, secure_password is
  # a custom validation method, allow_nil true is because password itself is
  # not store on DB
  validates :password, length: { minimum: 8, maximum: 30 }, secure_password: true, allow_nil: true

  # check to make sure user bio is not longer than 255 chars,
  # allow_nil is true because the bio is optional
  validates :bio, length: { maximum: 255 }, allow_nil: true

  after_initialize :ensure_session_token

  before_save :strip_email

  def self.find_by_credentials(login_input, password)
    user = login_input.include?("@") ? User.find_by(email: login_input) :
      User.find_by(username: login_input)

    user && user.is_password?(password) ? user : nil
  end

  # cleans up entered email address to remove any tag(s)
  def strip_email
    parts = self.email.split("@")
    parts[0].gsub!('.','')
    parts[0] = parts[0].split('+')[0]
    self.email = parts.join('@')
  end

  # hashes password upon creation and adds it to password_digest column
  def password=(password)
    @password = password
    p "self - password"
    p self
    self.password_digest = BCrypt::Password.create(password)
  end

  # verification of password
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