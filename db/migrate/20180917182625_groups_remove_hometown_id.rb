class GroupsRemoveHometownId < ActiveRecord::Migration[5.2]
  def change
    remove_column(:groups, :hometown_id)
  end
end
