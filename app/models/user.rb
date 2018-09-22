# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  name            :string           not null
#  hometown_id     :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'uri'
class User < ApplicationRecord
  validates :password_digest,
            :session_token, :name, :hometown_id, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP,
                              message: "(%{value}) is not a valid email address"}
  before_validation :ensure_session_token
  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    return nil unless user && user.is_password?(password)
    user
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  has_one_attached :avatar

  has_many :group_users,
    class_name: :GroupUser,
    foreign_key: :user_id

  has_many :groups,
    through: :group_users,
    source: :group

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end
end
