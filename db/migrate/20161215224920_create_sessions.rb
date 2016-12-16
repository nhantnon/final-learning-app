class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.string    :location,     null:false
      t.datetime  :time,         null:false
      t.integer   :course_id,     null:false

      t.timestamps(null:false)
    end
  end
end
