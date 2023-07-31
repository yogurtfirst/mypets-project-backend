const Joi = require("joi");
const noticeTypeEnum = require("../../constants/noticeTypeEnum");
const petSexEnum = require("../../constants/petSexEnum");
const { DATE_REGEX } = require("../../constants/regexValues");

exports.addNoticeValidator = (data) =>
  Joi.object().options({ abortEarly: false }).keys({
      noticeType: Joi.string().valid(...Object.values(noticeTypeEnum)).required().empty(false).messages({
        'string.base': 'The noticeType must be a string',
        'any.required': 'The noticeType field is required',
        'string.empty': 'The noticeType must not be empty',
        'any.only': 'The noticeType must be the one of "sell", "lost-or-found" or "in-good-hands"',
        }),
      title: Joi.string().min(3).required().empty(false).messages({
        'string.base': 'The title must be a string',
        'any.required': 'The title field is required',
        'string.empty': 'The title must not be empty',
        'string.min': 'The title must be not less 3 symbols',
        }),
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
      petType: Joi.string().min(3).required().empty(false).messages({
        'string.base': 'The petType must be a string',
        'any.required': 'The petType field is required',
        'string.empty': 'The petType must not be empty',
        'string.min': 'The petType must be not less 3 symbols',
        }),
      sex: Joi.string().valid(...Object.values(petSexEnum)).required().empty(false).messages({
        'string.base': 'The sex must be a string',
        'any.required': 'The sex field is required',
        'string.empty': 'The sex must not be empty',
        'any.only': 'The sex must be the one of "male" or "female"',
        }),
      location: Joi.string().min(3).required().empty(false).messages({
        'string.base': 'The name must be a string',
        'any.required': 'The name field is required',
        'string.empty': 'The name must not be empty',
        'string.min': 'The name must be not less 3 symbols',
        }),
      price: Joi.number().empty(false).messages({
        'number.base': 'The price must be a number',
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
      photoId: Joi.string()
    })
    .validate(data);
