class RenameMemberTypesColumnTypeToTitle < ActiveRecord::Migration[5.2]
  def change
    rename_column :member_types, :type, :title
  end
end
