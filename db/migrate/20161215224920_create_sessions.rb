class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.string    :location,     null:false
      t.datetime  :time,         null:false
      t.integer   :class_id,     null:false
      t.integer   :student_id,   null:false

      t.timestamps(null:false)
    end
  end
end
