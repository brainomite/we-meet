class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.integer :hometown_id, null: false

      t.timestamps
    end
    add_index :groups, :name, unique: true
    add_index :groups, :description
    add_index :groups, :hometown_id
  end
end
