const Product=require('../../models/product');

const getProducts=async(req,res)=>{
    try{
        const products=await Product.find().select('name imageUrl category').populate('category', 'name');
        res.status(200).json({products});
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

module.exports=getProducts; 