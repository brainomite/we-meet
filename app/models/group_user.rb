# == Schema Information
#
# Table name: group_users
#
#  id             :bigint(8)        not null, primary key
#  group_id       :integer          not null
#  user_id        :integer          not null
#  member_type_id :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class GroupUser < ApplicationRecord

  belongs_to :member_type,
    class_name: :MemberType,
    foreign_key: :member_type_id

  belongs_to :group,
    class_name: :Group,
    foreign_key: :group_id,
    inverse_of: :group_users

  belongs_to :members,
    class_name: :User,
    foreign_key: :user_id

end
