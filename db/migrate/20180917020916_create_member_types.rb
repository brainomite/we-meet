class CreateMemberTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :member_types do |t|
      t.string :type, null: false

      t.timestamps
    end
    add_index :member_types, :type, unique: true
  end
end
