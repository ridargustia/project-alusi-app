const Place = require('../models/Place');
const User = require('../models/User');

module.exports = {
    index: async (req, res) => {
        await Place.randomInit()
            .conditions({category_id: req.params.id})
            .options({limit: 5})
            .exec()
            .then(places => {
                if (places.length == 0) return res.status(400).json({message: 'Places is empty.'});
                res.status(200).json({
                    success: true,
                    message:'Request is successful.',
                    data: places
                });
            })
            .catch(error => res.status(400).json({message: error}));

    },
    store: async (req, res) => {
        const place = new Place({
            category_id: req.body.category_id,
            user_id: req.body.user_id,
            name: req.body.name,
            phone_number: req.body.phone_number,
            address: req.body.address,
            open_time: req.body.open_time,
            description: req.body.description,
            url_gmap: req.body.url_gmap
        });

        try {
            const savedPlace = await place.save();
            const user = await User.findById(req.body.user_id);
            user.places.push(savedPlace._id);
            await user.save();
            res.status(201).json({
                success: true,
                message: 'Created is successful.',
                data: savedPlace
            });
        } catch (error) {
            res.status(400).json({message: error});
        }
    },
    search: async (req, res) => {
        if (req.query.keyword) {
            const keyword = {name: {$regex: new RegExp(req.query.keyword, "i")}};
            try {
                const places = await Place.find(keyword);
                if (places.length == 0) return res.status(400).json({message: 'Place not found.'});
                res.status(200).json({
                    success: true,
                    message:'Request is successful.',
                    data: places
                });
            } catch (error) {
                res.status(400).json({message: error});
            }
        } else {
            await Place.randomInit()
                .conditions()
                .options({limit: 3})
                .exec()
                .then(places => {
                    if (places.length == 0) return res.status(400).json({message: 'Place not found.'});
                    res.status(200).json({
                        success: true,
                        message:'Request is successful.',
                        data: places
                    });
                })
                .catch(error => res.status(400).json({message: error}));
        }
    },
    show: async (req, res) => {
        try {
            const place = await Place.findById(req.params.id).populate('products');
            res.status(200).json({
                success: true,
                message: 'Request is successful',
                data: place
            });
        } catch (error) {
            res.status(400).json({message: error});
        }
    }
};