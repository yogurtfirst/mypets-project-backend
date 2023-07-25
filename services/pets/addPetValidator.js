const Joi = require("joi");
const { DATE_REGEX } = require("../../constants/regexValues");

exports.addPetValidator = (data) =>
  Joi.object()
    .keys({
      name: Joi.string().min(3).required(),
      birthday: Joi.string().regex(DATE_REGEX).required(),
      type: Joi.string().min(3).required(),
      comments: Joi.string().min(3).required(),
      photoURL: Joi.string().uri().required(),
      photoId: Joi.string(),
    })
    .validate(data);
