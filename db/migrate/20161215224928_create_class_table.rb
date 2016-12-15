class CreateClassTable < ActiveRecord::Migration
  def change
    create_table :class_tables do |t|
      t.string    :subject,       null:false
      t.text      :description,   null:false
      t.string    :location,      null:false
      t.string    :price,         null:false
      t.integer   :teacher_id,    null:false

      t.timestamps(null: false)
    end
  end
end
