json.group do
  json.set! group.id.to_s.to_sym do
    json.extract! group, :id, :name, :description,
                        :hometown, :group_user_ids, :member_ids
  end
end
json.users do
  group.members.each do |member|
    json.set! member.id.to_s.to_sym do
      json.partial! "api/users/user", user: member
    end
  end
end
json.group_users do
  group.group_users.each do |group_user|
    json.set! group_user.id.to_s.to_sym do
      json.extract! group_user, :id, :user_id, :group_id
      json.member_type group_user.member_type.title
    end
  end
end
