const User = require('../../models/user');
const Auction = require('../../models/auction');
const Bids = require('../../models/bids');
const Transaction = require('../../models/transaction');


const deleteAcc = async(req,res) => {
    try {
        const userId = req.params.id;
        console.log(userId);

        //Checking if any active or upcoming auctions by user
        const selling = await Auction.find({
            createdBy : userId,
            status: { $in: ["active" , "upcoming"]}
        });

        if(selling && selling.length > 0)
        {
            return res.status(403).json({
                msg:"Account cannot be deleted : You have active or upcoming auction"
            });
        }

        //Checking if user is the current highest bidder
        const topBid = await Auction.find({
            status : "active",
            currentWinner : userId
        })
        if(topBid && topBid.length > 0)
        {
            return res.status(403).json({
                msg:"Account cannot be deleted : You are the highest bidder in an auction currently"
            });
        }

        //Checking if the user has placed bids in an active auction
        const activeBidHistory = await Bids.find({bidderId : userId}).populate("auctionId");
        const activeParticipation = activeBidHistory.some(bid => bid.auctionid && bid.auctionId.status === "active");

        if(activeParticipation)
        {
            return res.status(403).json({
                msg: "Account cannot be deleted : You have bids in an active auction"
            });
        }

        //Checking if there is any pending Payments
        const pendingPay = await Transaction.find({
            $or: [{buyerId: userId}, {sellerId: userId}],
            paymentStatus: "pending"
        });

        if(pendingPay && pendingPay > 0)
        {
            return res.status(403).json({
                msg:"Account cannot be deleted: You have pending Payments"
            });
        }

        //If all checks are clear
        await User.findOneAndDelete({_id : userId});
        res.status(200).json({message: "Account deleted successfully"});
    } catch (error) {
        console.error("Error has occured" + error);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

module.exports = deleteAcc;
