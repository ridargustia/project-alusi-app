const joi = require('@hapi/joi');

//REGISTER VALIDATION
const registerValidation = (data) => {
    //VALIDATION
    const schema = joi.object({
        name: joi.string().required(),
        phone_number: joi.string().required().min(11),
        password: joi.string().required().min(6)
    });

    //LAKUKAN VALIDATION
    return schema.validate(data);
};

//LOGIN VALIDATION
const loginValidation = (data) => {
    //VALIDATION
    const schema = joi.object({
        phone_number: joi.string().required().min(11),
        password: joi.string().required().min(6)
    });

    //LAKUKAN VALIDATION
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
