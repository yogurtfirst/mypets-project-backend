const Joi = require('joi')

const PASSWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,16})/

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
        birthday: Joi.string().length(10),
        phone: Joi.string().min(10).max(13),
        city: Joi.string().min(2).max(30),
      })
      .validate(data)