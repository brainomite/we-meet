# == Schema Information
#
# Table name: group_users
#
#  id             :bigint(8)        not null, primary key
#  group_id       :integer          not null
#  user_id        :integer          not null
#  member_type_id :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class GroupUser < ApplicationRecord
end
