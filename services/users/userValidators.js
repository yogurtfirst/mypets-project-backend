const Joi = require('joi')
const { PASSWD_REGEX, DATE_REGEX, PHONE_REGEX } = require('../../constants/regexValues')

exports.registerUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(16),
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
    })
    .validate(data)

exports.updateUserDataValidator = (data) =>
    Joi.object()
      .options({ abortEarly: false })
      .keys({
        name: Joi.string().min(2).max(16),
        birthday: Joi.string().regex(DATE_REGEX),
        phone: Joi.string().regex(PHONE_REGEX),
        city: Joi.string().min(2).max(30),
      })
      .validate(data)