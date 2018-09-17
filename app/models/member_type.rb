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
end
