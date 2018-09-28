json.user do
  json.partial! "api/users/user", user: @user
end

json.groups do
  json.partial! "api/groups/groups", groups: current_user.groups
end
