json.extract! user, :id, :name, :hometown_id, :email
if user.avatar.attached?
  json.avatarUrl url_for(user.avatar)
else
  json.avatarUrl nil
end
