const Article = require('../models/Article');

module.exports = {
    index: async (req, res) => {
        await Article.randomInit()
            .options({limit: 5})
            .exec()
            .then(articles => {
                if (!articles) return res.status(400).json({message: 'Products is empty.'});
                res.status(200).json({
                    success: true,
                    message:'Request is successful.',
                    data: articles
                });
            })
            .catch(error => res.status(400).json({message: error}));

    },
    store: async (req, res) => {
        const article = new Article({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            image: req.body.image
        });

        try {
            const savedArticle = await article.save();
            res.status(201).json({
                success: true,
                message: 'Created is successful',
                data: savedArticle
            });
        } catch (error) {
            res.status(400).json({message: error});
        }
    }
};