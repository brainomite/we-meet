json.extract! user, :id, :name, :hometown_id, :email
if user.avatar.attached?
  json.avatar url_for(user.avatar)
else
  json.avatar nil
end
