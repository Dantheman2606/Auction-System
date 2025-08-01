const mongoose = require('mongoose');
const bidSchema = new mongoose.Schema({
    auctionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auction",
        required: true
    },
    bidderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bidAmount: {
        type: Number,
        required: true
    },
    bidTime: {
        type: Date,
        default: Date.now
    }
});

const Bids = mongoose.model("Bids", bidSchema, "Bids");

module.exports = Bids;
