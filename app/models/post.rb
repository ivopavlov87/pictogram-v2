class Post < ApplicationRecord
  validates :user_id, :photos, presence: true

  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many_attached :photos, dependent: :destroy
end