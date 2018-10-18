groups.each do |group|
  json.set! group.id.to_s.to_sym do
    json.extract! group, :id, :name
    json.member_count group.group_users.ids.count
  end
end
