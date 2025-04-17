const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ListingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    imageUrl: {

        type: String,
        default: "https://www.pexels.com/photo/a-beach-house-with-palm-trees-and-the-ocean-in-the-background-19130093/",
        // default: "https://images.pexels.com/photos/19130093/pexels-photo-19130093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        set:(v) => v===""?"https://www.pexels.com/photo/a-beach-house-with-palm-trees-and-the-ocean-in-the-background-19130093/":v, 
    
        required: true,
    },
}, { timestamps: true });
const Listing = mongoose.model('Listing', ListingSchema);
module.exports = Listing;