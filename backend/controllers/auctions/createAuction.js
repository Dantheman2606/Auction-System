const Auction = require('../../models/auction');
const Product = require('../../models/product');

const createAuction = async (req, res) => {
    try {
        const { productId, startTime, endTime, startingPrice } = req.body;

        if (!productId || !startTime || !endTime || !startingPrice) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let status = "upcoming";
        const now = new Date();

        if (new Date(startTime) <= now && new Date(endTime) > now) {
            status = "active";
        } else if (new Date(endTime) <= now) {
            status = "ended";
        }

        // const existingAuction=await Auction.findOne({productId});
        // if(existingAuction){
        //     return res.status(400).json({message:"An auction for this product already exists"});
        // }

        // console.log("User from middleware:", req.user_id);

        const auction = new Auction({
            productId,
            startTime,
            endTime,
            startingPrice,
            createdBy: req.user_id.id,
            status
        });


        const product = await Product.findById(productId);
if (!product) {
   return res.status(404).json({ message: "Product not found" });
}


        await auction.save();

        const populatedAuction = await Auction.findById(auction._id)
            .populate({
                path: 'productId',
                select: 'name description imageUrl category' 
            });
        res.status(201).json({
            message: "Auction created successfully",
            auction: populatedAuction
        });
    }
    catch (error) {
        console.error("Error creating auction:", error);
        res.status(500).json({ message: "Server error",
            error: error.message
        });

    }
}

module.exports = createAuction;