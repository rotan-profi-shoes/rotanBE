//Validation
const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

const shoeValidation = (data) => {
    const schema = Joi.object({
        sku: Joi.string().min(6).required(),
        name: Joi.string().required(),
        gender: Joi.required(),
        form: Joi.required(),
        shoesClass: Joi.required(),
        protectionClass: Joi.required(),
        color: Joi.required(),
        size: Joi.required(),
        price: Joi.number().required(),
        modification: Joi.required(),
        material: Joi.required(),
        sole: Joi.required(),
    });

    return schema.validate(data);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.shoeValidation = shoeValidation;