json.extract! post, :id, :caption, :location, :user_id, :updated_at, :created_at

# json.author post.user.username

# if post.user.profile_picture.attached?
#   json.authorPic url_for(post.user.profile_picture)
# else
#   json.authorPic image_url('default_user_photo.png')
# end

json.author do
  json.id post.user.id
  json.username post.user.username
  json.name post.user.name
  if post.user.profile_picture.attached?
    json.profilePicture url_for(post.user.profile_picture)
  else
    json.profilePicture image_url('default_user_photo.png')
  end
end

json.photoURLs post.photos.map { |file| url_for(file) }

json.comments @comments do |comment|
  json.partial! 'api/comments/comment', comment: comment
end