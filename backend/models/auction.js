const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true  // ensures one product has only one auction
  },
  startTime: { 
    type: Date, 
    required: true },
  endTime: { 
    type: Date, 
    required: true },
  startingPrice: { 
    type: Number, 
    required: true },
  currentBid: { 
    type: Number, 
    default: 0 },
  currentWinner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    default: null 
  },
  status: {
    type: String,
    enum: ["upcoming", "active", "ended"],
    default: "upcoming"
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
  }, {timestamps: true});

const Auction = mongoose.model('Auction', auctionSchema, 'Auction');
module.exports = Auction;
