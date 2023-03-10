
json.extract! @listing, :id, :agent_id,
    :status, :street_address, :city, :state,
    :zip, :property_type, :list_price,
    :beds, :baths, :sqft, :lot,
    :description,
    :year_built, :lat, :lng, 
    :est_mo_payment,:greenfin_estimate, :price_per_sqft

json.photoUrl @listing.photos.map{|photo| photo.url}

json.created_at @listing.created_at.strftime("%b %e, %Y")


