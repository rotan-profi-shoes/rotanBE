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
        parentSku: Joi.required(),
        sku: Joi.string().min(3).required(),
        name: Joi.string().required(),
        gender: Joi.required(),
        form: Joi.required(),
        shoesClass: Joi.required(),
        zertifikat: Joi.required(),
        color: Joi.required(),
        modification: Joi.required(),
        material: Joi.required(),
        sole: Joi.required(),
        upperLeather: Joi.required(),
        description: Joi.required(),
        capDescription: Joi.required(),
        soleDescription: Joi.required(),
        photos: Joi.required(),
        shoesSizes: Joi.required(),
        shoesType: Joi.required(),
    });

    return schema.validate(data);
};

const orderValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        addressLine: Joi.string().required(),
        postalCode: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        email: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        deliveryMethod: Joi.string().required(),
        paymentMethod: Joi.string().required(),
        products: Joi.required(),
        priceForProducts: Joi.string().required(),
        deliveryPrice: Joi.string().required(),
        totalPriceForProducts: Joi.string().required(),
    });

    return schema.validate(data);
}

const sizeValidation = (data) => {
    const schema = Joi.object({
        shoesId: Joi.string().required(),
        sizeValue: Joi.string().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.shoeValidation = shoeValidation;
module.exports.sizeValidation = sizeValidation;
module.exports.orderValidation = orderValidation;
