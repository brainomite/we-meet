# == Schema Information
#
# Table name: groups
#
#  id          :bigint(8)        not null, primary key
#  name        :string           not null
#  description :text             not null
#  hometown_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Group < ApplicationRecord
  validates :name, :description, :hometown_id, presence: true
  validates :description, length: { minimum: 50 }

  has_many :group_users,
    class_name: :GroupUser,
    foreign_key: :group_id,
    inverse_of: :group

  has_many :members,
    through: :group_users,
    source: :members


  accepts_nested_attributes_for :group_users
end
