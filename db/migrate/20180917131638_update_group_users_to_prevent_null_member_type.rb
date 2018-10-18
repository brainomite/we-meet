class UpdateGroupUsersToPreventNullMemberType < ActiveRecord::Migration[5.2]
  def change
    change_column :group_users, :member_type_id, :integer, null: false
  end
end
