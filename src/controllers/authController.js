const User = require('../models/User');
// const crypto = require('crypto');
const { registerValidation, loginValidation } = require('../validations/authValidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { config } = require('../config');

module.exports = {
    login: async (req, res) => {
        //LAKUKAN VALIDATION
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).json({message: error.details[0].message});

        //CEK APAKAH PHONE NUMBER SUDAH ADA DI DATABASE
        const user = await User.findOne({phone_number: req.body.phone_number});
        if (!user) return res.status(400).json({message: 'Phone number is not found'});

        //MENGECEK PASSWORD
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({message: 'Invalid password'});

        //CREATE AND ASSIGN A TOKEN
        const token = jwt.sign({_id: user._id}, config.token_secret);
        res.header('auth-token', token).json({
            success: true,
            message: 'Login success',
            data: {
                api_token: token
            }
        });

    },
    register: async (req, res) => {
        //LAKUKAN VALIDATION
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).json({
            success: false,
            message: error.details[0].message
        });

        //CEK APAKAH PHONE NUMBER SUDAH ADA DI DATABASE
        const phone_numberExist = await User.findOne({phone_number: req.body.phone_number});
        if (phone_numberExist) return res.status(400).json({
            success: false,
            message: 'Phone number already exists'
        });
        
        //ENKRIPSI PASSWORD DENGAN MODUL CRYPTO
        // const secret = 'secure';
        // const password = crypto.createHmac('sha256', secret).update(req.body.password).digest('hex');

        //ENKRIPSI PASSWORD DENGAN BCRYPTJS
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //BUAT USER BARU
        const user = new User({
            name: req.body.name,
            phone_number: req.body.phone_number,
            password: hashedPassword
        });

        try {
            const savedUser = await user.save();
            res.status(201).json({
                success: true,
                message: 'Register is successful',
                data: savedUser
            });

        } catch (error) {
            res.status(400).json({message: error});
        }
        
    }
}