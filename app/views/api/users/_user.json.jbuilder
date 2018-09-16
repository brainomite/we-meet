json.extract! user, :id, :name, :hometown_id, :email
if user.photo.attached?
  json.photo url_for(user.photo)
else
  json.photo nil
end
