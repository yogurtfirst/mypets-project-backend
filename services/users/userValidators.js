const Joi = require('joi')
const { DATE_REGEX, PHONE_REGEX } = require('../../constants/regexValues')

exports.updateUserDataValidator = (data) =>
    Joi.object()
      .options({ abortEarly: false })
      .keys({
        name: Joi.string().min(2).max(16).required().empty(false).messages({
          'string.base': 'The name must be a string',
          'any.required': 'The name field is required',
          'string.empty': 'The name must not be empty',
          'string.min': 'The name must be not less 2 symbols',
          'string.max': 'The name must be not more 16 symbols',
          }),
        birthday: Joi.string().regex(DATE_REGEX).required().empty(false).messages({
          'string.base': 'The birthday must be a string',
          'any.required': 'The birthday field is required',
          'string.empty': 'The birthday must not be empty',
          'string.pattern.base': 'The birthday must be in format YYYY-MM-DD',
          }),
        phone: Joi.string().regex(PHONE_REGEX).empty(false).messages({
          'string.base': 'The phone must be a string',
          'string.empty': 'The phone must not be empty',
          'string.pattern.base': 'The phone must be in format +380XXXXXXXXX',
          }),
        city: Joi.string().min(2).max(30).empty(false).messages({
          'string.base': 'The city must be a string',
          'string.empty': 'The city must not be empty',
          'string.min': 'The city must be not less 2 symbols',
          'string.max': 'The city must be not more 30 symbols',
          }),
        avatarURL: Joi.string().uri(),
        avatarId: Joi.string(),
      })
      .validate(data)