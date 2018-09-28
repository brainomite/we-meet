groups.each do |group|
  json.set! group.id.to_s.to_sym do
    json.extract! group, :id, :name, :description, :hometown
  end
end
