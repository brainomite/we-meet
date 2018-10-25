groups.each do |group|
  json.set! group.id.to_s.to_sym do
    json.extract! group, :id, :name
    json.member_count group.group_users.ids.count
    if group.image.attached?
      json.imageUrl url_for(group.image)
    else
      json.imageUrl asset_path("default-group-0.png")
    end
  end
end
