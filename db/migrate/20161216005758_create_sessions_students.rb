class CreateSessionsStudents < ActiveRecord::Migration
  def change
    create_table :sessions_students do |t|
      t.integer :session_id, null: false
      t.integer :student_id, null: false

      t.timestamps(null: false)
    end
  end
end
