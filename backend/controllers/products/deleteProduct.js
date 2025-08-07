const Product = require('../../models/product');
const Auction = require('../../models/auction');

const deleteProduct = async (req, res) => {

    const { id: productId } = req.params;

    try {    // Check if product exists    
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        // Find any auctions using this product    
        const auction = await Auction.findOne({ product: productId });

        if (auction) {
            if (auction.status === "active" || auction.status === "ended") {
                return res.status(400).json({
                    message: 'Product cannot be deleted because Auction is either on-going or completed' // dumbass            
                })
            }
            // If the auction exists, check if it starts in 1 day or not      
            const now = new Date();
            const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            if (auction.startTime <= oneDayFromNow) { 
                return res.status(400).json({ 
                    message: 'Product cannot be deleted because its auction starts within 1 day.'
                }); 
            }
        }
        // No auction or it's safe to delete    
        await Product.findByIdAndDelete(productId);
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
module.exports = deleteProduct ;
