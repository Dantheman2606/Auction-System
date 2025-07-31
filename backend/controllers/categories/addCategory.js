const Category = require('../../models/Category');

const addCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ msg: "Category name is required" });
        }

        let category = await Category.findOne({ name: name.trim().toLowerCase() });

        if (category) {
            return res.status(200).json({ message: "Category already exists", category });
        }

        const newCategory = new Category({ name: name.trim().toLowerCase() });
        await newCategory.save();

        return res.status(201).json({
            msg: "Category added successfully",
            category: newCategory
        });
    } catch (error) {
        console.error("Error adding category:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}
module.exports = addCategory;