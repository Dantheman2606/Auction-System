const Product = require('../../models/product');

const createProduct = async (req, res) => {
    try {
        const { name, description, imageUrl, category } = req.body;

        // Validate required fields
        if (!name || !category) {
            return res.status(400).json({ msg: "Name and category are required" });
        }

        // Create new product instance
        const newProduct = new Product({
            name,
            description,
            imageUrl: imageUrl ? imageUrl.map(url => ({ url })) : [],
            category,
            createdBy: req.user.id // Assuming user ID is available in req.user
        });

        // Save the product to the database
        await newProduct.save();

        return res.status(201).json({
            msg: "Product created successfully",
            product: {              // remove this shit later`
                _id: newProduct._id,
                name: newProduct.name,
                description: newProduct.description,
                imageUrl: newProduct.imageUrl,
                category: newProduct.category,
                createdBy: newProduct.createdBy,
                createdAt: newProduct.createdAt
            }
        });
    } catch (error) {
        console.error("Product creation error: ", error);
        return res.status(500).json({ msg: "Error creating product" });
    }
}

module.exports = createProduct;