class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table :cards do |t|
      t.string :name
      t.string :email
      t.string :address
      t.string :birth
      t.string :password
      t.text :md5
      t.string :status, default: "未登録"
      t.boolean :authc, default: false
      t.timestamps null: false
    end
  end
end
