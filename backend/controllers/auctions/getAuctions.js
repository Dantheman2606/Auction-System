const Auction = require('../../models/auction');

const getActiveAuctions = async (req, res) => {
    try{
        const activeAuctions= await Auction.find({status:"active"})
    .populate("productId","name description imageUrl category")
    .populate("currentWinner","username email");

    if(activeAuctions.length===0){
        return res.status(404).json({message:"No active auctions found"});
    }
    res.status(200).json({activeAuctions});
    }
    catch(error){
        console.error("Error fetching active auctions:",error);
        res.status(500).json({message:"Server error"});
    }    
}

module.exports=getActiveAuctions;