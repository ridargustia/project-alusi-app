const User = require('../models/User');

module.exports = {
    index: async (req, res) => {
        try {
            const user = await User.findById(req.user._id).populate('places');
            res.status(200).json({
                success: true,
                message: 'Request is successful.',
                data: user
            });
        } catch (error) {
            res.status(400).json({message: error});
        }
    }
};