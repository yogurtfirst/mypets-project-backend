const Joi = require("joi");
const { DATE_REGEX } = require("../../constants/regexValues");

exports.addPetValidator = (data) =>
  Joi.object().options({ abortEarly: false }).keys({
      name: Joi.string().min(3).required().empty(false).messages({
        'string.base': 'The name must be a string',
        'any.required': 'The name field is required',
        'string.empty': 'The name must not be empty',
        'string.min': 'The name must be not less 3 symbols',
        }),
      birthday: Joi.string().regex(DATE_REGEX).required().empty(false).messages({
        'string.base': 'The birthday must be a string',
        'any.required': 'The birthday field is required',
        'string.empty': 'The birthday must not be empty',
        'string.pattern.base': 'The birthday must be in format YYYY-MM-DD',
        }),
      type: Joi.string().min(3).required().empty(false).messages({
        'string.base': 'The type must be a string',
        'any.required': 'The type field is required',
        'string.empty': 'The type must not be empty',
        'string.min': 'The type must be not less 3 symbols',
        }),
      comments: Joi.string().min(3).required().empty(false).messages({
        'string.base': 'The comments must be a string',
        'any.required': 'The comments field is required',
        'string.empty': 'The comments must not be empty',
        'string.min': 'The comments must be not less 3 symbols',
        }),
      photoURL: Joi.string().uri().required().messages({
        'any.required': 'The photo field is required',
        }),
      photoId: Joi.string(),
    })
    .validate(data);
