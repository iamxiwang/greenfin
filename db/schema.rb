# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_16_000322) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "appointments", force: :cascade do |t|
    t.bigint "agent_id", null: false
    t.bigint "user_id", null: false
    t.bigint "listing_id", null: false
    t.datetime "tour_time", null: false
    t.string "message"
    t.boolean "cancelled"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["agent_id"], name: "index_appointments_on_agent_id"
    t.index ["listing_id"], name: "index_appointments_on_listing_id"
    t.index ["user_id"], name: "index_appointments_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "listing_id", null: false
    t.string "body", null: false
    t.bigint "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_comments_on_author_id"
    t.index ["listing_id"], name: "index_comments_on_listing_id"
  end

  create_table "likes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "listing_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["listing_id"], name: "index_likes_on_listing_id"
    t.index ["user_id", "listing_id"], name: "index_likes_on_user_id_and_listing_id", unique: true
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "listings", force: :cascade do |t|
    t.bigint "agent_id", null: false
    t.string "status", null: false
    t.string "street_address", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.integer "zip", null: false
    t.string "property_type", null: false
    t.integer "list_price", null: false
    t.integer "beds", null: false
    t.integer "baths", null: false
    t.integer "sqft", null: false
    t.integer "lot", null: false
    t.text "description"
    t.integer "year_built", null: false
    t.float "lat", null: false
    t.float "lng", null: false
    t.integer "est_mo_payment", null: false
    t.integer "greenfin_estimate", null: false
    t.integer "price_per_sqft", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["agent_id"], name: "index_listings_on_agent_id"
    t.index ["city", "state"], name: "index_listings_on_city_and_state"
    t.index ["street_address"], name: "index_listings_on_street_address", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "appointments", "listings"
  add_foreign_key "appointments", "users"
  add_foreign_key "appointments", "users", column: "agent_id"
  add_foreign_key "comments", "listings"
  add_foreign_key "comments", "users", column: "author_id"
  add_foreign_key "likes", "listings"
  add_foreign_key "likes", "users"
  add_foreign_key "listings", "users", column: "agent_id"
end
