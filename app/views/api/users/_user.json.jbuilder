json.extract! user, :id, :username, :name, :email, :bio

if user.admin_type && current_user.admin_type
  json.admin_type user.admin_type
end