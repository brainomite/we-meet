class GroupsAddHometown < ActiveRecord::Migration[5.2]
  def change
    add_column :groups, :hometown, :string, null: false
    add_index :groups, :hometown
  end
end
