json.extract! user, :id, :name, :hometown_id, :email
if user.avatar.attached?
  json.avatarUrl url_for(user.avatar)
else
  json.avatarUrl nil
end

if logged_in? && user == current_user
  json.extract! user, :group_ids
end
