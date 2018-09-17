# == Schema Information
#
# Table name: member_types
#
#  id         :bigint(8)        not null, primary key
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class MemberType < ApplicationRecord
  validates :title, presence: true, uniqueness: true

  has_many :group_users,
    class_name: :GroupUser,
    foreign_key: :member_type_id

  def self.organizer
    self.find_by_title('Organizer')
  end

  def self.regular_member
    self.find_by_title('Regular Member')
  end
end
