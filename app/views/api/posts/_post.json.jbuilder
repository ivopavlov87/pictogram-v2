json.extract! post, :id, :caption, :location, :user_id, :updated_at, :created_at

json.author post.user, :id, :username