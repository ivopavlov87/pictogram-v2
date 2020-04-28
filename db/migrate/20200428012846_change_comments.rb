class ChangeComments < ActiveRecord::Migration[6.0]
  def change
    change_column :comments, :body, :string, limit: 255
  end
end
