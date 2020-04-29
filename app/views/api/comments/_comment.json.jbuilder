json.extract! comment, :id, :user_id, :post_id, :body

json.author do
  json.id comment.user.id
  json.username comment.user.username
  if comment.user.profile_picture.attached?
    json.profilePicture url_for(comment.user.profile_picture)
  else
    json.profilePicture image_url('default_user_photo.png')
  end
end