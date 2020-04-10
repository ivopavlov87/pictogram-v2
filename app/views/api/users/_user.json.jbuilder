json.extract! user, :id, :username, :name, :email, :bio

if current_user && user.admin_type && current_user.admin_type
  json.admin_type user.admin_type
end

json.posts @posts do |post|
  json.partial! 'api/posts/post', post: post
end

json.profilePicture image_url('default_user_photo.png')