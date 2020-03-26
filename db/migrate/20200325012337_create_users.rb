class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username, null: false, limit: 30
      t.string :name, null: false, limit: 50
      t.string :email, null: false
      t.string :session_token, null: false
      t.string :password_digest, null: false
      t.string :bio, limit: 255

      t.timestamps
    end
    add_index :users, :username, unique: true
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
