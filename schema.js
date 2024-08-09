const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        country: Joi.string().required(),
        location: Joi.string().required(),
        image: Joi.string().allow("", null),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        comment:Joi.string().required(),
        rating:Joi.number().required().min(1).max(5),
    }).required()
})

module.exports.bookingSchema=Joi.object({
    booking:Joi.object({
        name:Joi.string().required(),
        email: Joi.string().email().required(),
        bookFrom: Joi.date().iso().required(),
        bookTo: Joi.date().iso().greater(Joi.ref('bookFrom')).required(),
        people:Joi.number().required(),
        contact:Joi.string().required(),
    }).required()
})


module.exports.cardSchema = Joi.object({
    card:Joi.object({
        cardNumber: Joi.string()
        .pattern(/^\d{4} \d{4} \d{4} \d{4}$/)// 16-digit card number
        .required()
        .messages({
            'string.pattern.base': 'Card number must be in the format 16 digits',
            'any.required': 'Card number is required'
        }),     
    expiryDate: Joi.string()
        .pattern(/^(0[1-9]|1[0-2])\/\d{2}$/) // MM/YY format
        .required()
        .messages({
            'string.pattern.base': 'Expiry date must be in the format MM/YY',
            'any.required': 'Expiry date is required'
        }),
    cvv: Joi.string()
        .pattern(/^\d{3}$/) // 3-digit CVV
        .required()
        .messages({
            'string.pattern.base': 'CVV must be a 3-digit number',
            'any.required': 'CVV is required'
        })
    })
})
//module.exports = listingSchema;

