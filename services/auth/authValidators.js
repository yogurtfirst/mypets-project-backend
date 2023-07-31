const Joi = require('joi')
const { PASSWD_REGEX } = require('../../constants/regexValues')

exports.registerUserDataValidator = (data) =>
    Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().min(2).max(16).required().empty(false).messages({
            'string.base': 'The name must be a string',
            'any.required': 'The name field is required',
            'string.empty': 'The name must not be empty',
            'string.min': 'The name must be not less 2 symbols',
            'string.max': 'The name must be not more 16 symbols',
            }),
        email: Joi.string().email().required().empty(false).messages({
            'string.base': 'The email must be a string',
            'any.required': 'The email field is required',
            'string.empty': 'The email must not be empty',
            'string.email': 'The email must be in format user@example.com',
            }),
        password: Joi.string().regex(PASSWD_REGEX).required().empty(false).messages({
            'string.base': 'The password must be a string',
            'any.required': 'The password field is required',
            'string.empty': 'The password must not be empty',
            'string.min': 'The password must be not less 6 symbols',
            'string.max': 'The password must be not more 16 symbols',
            'string.pattern.base': 'The password must consist at least 1 capitalized letter, 1 string letter and 1 number',
            }),
        })
        .validate(data)

exports.loginUserDataValidator = (data) =>
    Joi.object().options({ abortEarly: false }).keys({
            email: Joi.string().email().required().empty(false).messages({
                'string.base': 'The email must be a string',
                'any.required': 'The email field is required',
                'string.empty': 'The email must not be empty',
                'email.base': 'The email must be in format user@example.com',
              }),
            password: Joi.string().required().empty(false).messages({
                'string.base': 'The password must be a string',
                'any.required': 'The password field is required',
                'string.empty': 'The password must not be empty',
                }),
        })
        .validate(data)