const Category = require('../../models/Category');
const Product = require('../../models/product');
const Auction = require('../../models/auction');

const deleteCategory = async (req,res) => {
    try
    {
        const categoryId = req.params.id;

        //Check if any products belong to this category
        const products = await Product.find({ category : categoryId});

        if(products && products.length > 0)
        {
            return res.status(403).json({
                msg: "Category cannot be deleted : There exists products assigned to it"
            });
        }

        //check if any auctions use this category via products
        const productIds = products.map(products => Product._id);
        const auctions = await Auction.find({ productId : {$in: productIds}});

        if(auctions && auctions.length > 0)
        {
            return res.status(403).json({
                msg:"Category cannot be deleted: There exsit one or more auction using products from this category"
            });
        }

        //All checks clear
        await Category.findOneAndDelete({_id : categoryId});
        res.status(200).json({msg: "Category deleted successfully"});
    } catch(error)
    {
        console.error("Error deleting category: ",err);
        res.status(500).josn({ msg : "Internal server error"});
    }
}

module.exports = deleteCategory;
