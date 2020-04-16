json.extract! user, :id, :username, :name, :email, :bio

if current_user && user.admin_type && current_user.admin_type
  json.admin_type user.admin_type
end

json.posts @posts do |post|
  json.partial! 'api/posts/post', post: post
  json.photoURLs post.photos.map { |file| url_for(file) }
  # if post.photos.attached?
  #   json.photoURLs @post.photos.map { |file| url_for(file) }
  # end
end

if user.profile_picture.attached?
  json.profilePicture url_for(user.profile_picture)
else
  json.profilePicture image_url('default_user_photo.png')
end