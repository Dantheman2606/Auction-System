const Product = require('../../models/product');

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body; // new values coming from frontend

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updates,
      { new: true, runValidators: true } // return updated doc + validate schema
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateProduct;
