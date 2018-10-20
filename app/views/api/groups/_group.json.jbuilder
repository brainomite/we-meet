json.group do
  json.set! group.id.to_s.to_sym do
    json.extract! group, :id, :name, :description,
                        :hometown, :group_user_ids, :member_ids
  end
end
if logged_in?
  group_ids = current_user.group_ids
  common_group_counts = User.joins(:group_users)
                                     .where(id: group.member_ids,
                                       group_users: {
                                         group_id: group_ids
                                       }
                                     )
                                     .group(:id)
                                     .count
end

json.users do
  group.members.each do |member|
    json.set! member.id.to_s.to_sym do
      json.partial! "api/users/user", user: member
      if logged_in?
        if common_group_counts[member.id].nil? || member == current_user
          json.common_group_counts 0
        else
          json.common_group_counts common_group_counts[member.id]
        end
      end
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
