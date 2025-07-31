const Category = require('../../models/Category');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().select('name description');

        if (!categories || categories.length === 0) {
            return res.status(404).json({
                msg: "No categories found"
            });
        }

        return res.status(200).json({
            msg: "Categories fetched successfully",
            categories
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
}

module.exports = getCategories;