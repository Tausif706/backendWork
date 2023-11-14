import mongoose from "mongoose";
const productListingSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true 
        },
        description: String,
        price: Number,
        seller: {type: String},
        chatRoomId: String,
    }
);
  

  export const ProductListing = mongoose.model('ProductListing', productListingSchema);