const Subcategory = require('../models/Subcategory');

module.exports = {
    index: async (req, res) => {
        await Subcategory.find({category_id: req.params.id})
            .exec()
            .then(subcat => {
                if (subcat.length == 0) return res.status(400).json({message: 'Sub categories is empty.'});
                res.status(200).json({
                    success: true,
                    message: 'Request is successful.',
                    count: subcat.length,
                    data: subcat
                });
            })
            .catch(error => res.status(400).json({message: error}));
    },
    store: async (req, res) => {
       const subcategory = new Subcategory({
            category_id: req.body.category_id,
            name: req.body.name,
            image: req.body.image,
       });

       try {
           const savedSubcategory = await subcategory.save();
            res.status(201).json({
                success: true,
                message: 'Created is successful',
                data: savedSubcategory
            });
       } catch (error) {
           res.status(400).json({message: error});
       }
    }
};