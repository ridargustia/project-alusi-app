const Product = require('../models/Product');

module.exports = {
    index: async (req, res) => {
        await Product.randomInit()
            .conditions({category_id: req.params.id})
            .options({limit: 5})
            .exec()
            .then(products => {
                if (products.length == 0) return res.status(400).json({message: 'Products is empty.'});
                res.status(200).json({
                    success: true,
                    message:'Request is successful.',
                    data: products
                });
            })
            .catch(error => res.status(400).json({message: error}));
            
    },
    store: async (req, res) => {
       const product = new Product({
            place_id: req.body.place_id,
            category_id: req.body.category_id,
            subcategory_id: req.body.subcategory_id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
       });

       try {
           const savedProduct = await product.save();
            res.status(201).json({
                success: true,
                message: 'Created is successful',
                data: savedProduct
            });
       } catch (error) {
           res.status(400).json({message: error});
       }
    }
};