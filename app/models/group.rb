# == Schema Information
#
# Table name: groups
#
#  id          :bigint(8)        not null, primary key
#  name        :string           not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  hometown    :string           not null
#

class Group < ApplicationRecord
  validates :hometown, presence: true
  validates :description, length: { minimum: 50 }
  validates :name, length: { minimum: 5 }

  has_many :group_users,
    class_name: :GroupUser,
    foreign_key: :group_id,
    inverse_of: :group,
    dependent: :destroy

  has_many :members,
    through: :group_users,
    source: :members

  has_many :member_types,
    through: :group_users,
    source: :member_type

  has_one_attached :image

  accepts_nested_attributes_for :group_users
end
