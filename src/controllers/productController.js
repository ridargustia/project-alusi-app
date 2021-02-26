const Product = require('../models/Product');
const Place = require('../models/Place');

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
           const place = await Place.findById(savedProduct.place_id);
           place.products.push(savedProduct._id);
           await place.save();
            res.status(201).json({
                success: true,
                message: 'Created is successful',
                data: savedProduct
            });
       } catch (error) {
           res.status(400).json({message: error});
       }
    },
    search: async (req, res) => {
        if (req.query.keyword) {
            const keyword = {name: {$regex: new RegExp(req.query.keyword, "i")}};
            try {
                const products = await Product.find(keyword);
                if (products.length == 0) return res.status(400).json({message: 'Product not found.'});
                res.status(200).json({
                    success: true,
                    message:'Request is successful.',
                    data: products
                });
            } catch (error) {
                res.status(400).json({message: error});
            }
        } else {
            await Product.randomInit()
                .conditions()
                .options({limit: 3})
                .exec()
                .then(products => {
                    if (products.length == 0) return res.status(400).json({message: 'Product not found.'});
                    res.status(200).json({
                        success: true,
                        message:'Request is successful.',
                        data: products
                    });
                })
                .catch(error => res.status(400).json({message: error}));
        }
    },
    show: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id).populate('subcategory_id place_id');
            const otherProducts = await Product.find({place_id: product.place_id, _id: {$nin: product._id }});
            res.status(200).json({
                success: true,
                message: 'Request is successful',
                data: {
                    product: product,
                    otherProducts: otherProducts 
                }
            });
        } catch (error) {
            res.status(400).json({message: error});
        }

    }
};