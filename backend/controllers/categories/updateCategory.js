const Category = require('../../models/Category');

const updateCategory = async (req, res) => {
    try{
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ msg: "Category name is required" });
        }

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ msg: "Category not found" });
        }

        // Check if the new name already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory && existingCategory._id.toString() !== id) {
            return res.status(400).json({ msg: "Category name already exists" });
        }

        category.name = name;
        await category.save();

        return res.status(200).json({
            msg: "Category updated successfully",
            category: {
                _id: category._id,
                name: category.name
            }
        });
    }
    catch (error) {
        console.error("Category update error: ", error);
        return res.status(500).json({ msg: "Error updating category" });
    }
}

module.exports = updateCategory;