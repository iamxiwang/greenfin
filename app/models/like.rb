# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  listing_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Like < ApplicationRecord
  validates :user_id, :listing_id, presence: true
  validates :user_id, uniqueness: { scope: :listing_id, message: 'has already liked this listing' }
  belongs_to :user,
      foreign_key: :user_id,
      class_name: :User

  belongs_to :listing,
    foreign_key: :listing_id,
    class_name: :Listing
end
