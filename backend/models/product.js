const mongoose = require('mongoose');

const imageUrls = new mongoose.Schema({
  url: { 
    type: String, 
    required: true }
});

const productSchema = new mongoose.Schema({
 name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  imageUrl: { 
    type: [imageUrls] 
  }, // or an array if multiple images
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Category", 
    required: true 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }, // optional
  createdAt: { 
    type: Date, 
    default: Date.now }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema, "Product");

module.exports = Product;
