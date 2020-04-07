class Post < ApplicationRecord
  validates :user_id, :caption, presence: true

  belongs_to :user
end