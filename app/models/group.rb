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
  validates :name, :description, presence: true
  validates :description, length: { minimum: 50 }

  # ta q - i can change this to be more semantic
  # has_many :group_users,
  has_many :group_users
    class_name: :GroupUser,
    foreign_key: :group_id

  has_many :members,
    through: :group_users,
    soruce: :members

end
