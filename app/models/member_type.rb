# == Schema Information
#
# Table name: member_types
#
#  id         :bigint(8)        not null, primary key
#  type       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class MemberType < ApplicationRecord
end
