const Category = require('../models/Category');

module.exports = {
    index: async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json({
                success: true,
                message: 'Request is successful.',
                data: categories
            });
        } catch (error) {
            res.status(400).json({message: error});
        }
    },
    store: async (req, res) => {
        const category = new Category({
            name: req.body.name
        });

        try {
            const savedCategory = await category.save();
            res.status(201).json({
                success: true,
                message: 'Created is successful',
                data: savedCategory
            });
        } catch (error) {
            res.status(400).json({message: error});
        }
    }
};