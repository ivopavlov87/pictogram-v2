class AddColumnAdminTypeToUsersWithFalseAsDefault < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :admin_type, :boolean, :default => false
  end
end
