const mongoose = require("mongoose");

// Transaction Schema for Auction System
const transactionSchema = new mongoose.Schema({
    auctionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Auction", 
        required: true 
    },
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true 
    },
    buyerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: { 
        type: Number, 
        required: true 
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    paymentMethod: { 
        type: String 
        // e.g., "credit_card", "razorpay"
    },
    transactionDate: { 
        type: Date, 
        default: Date.now 
    }
});

const Transaction = mongoose.model("Transaction", transactionSchema, "Transaction");

module.exports = Transaction;