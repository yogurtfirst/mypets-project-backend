const Joi = require("joi");

exports.addPetValidator = (data) =>
  Joi.object()
    .keys({
      name: Joi.string().min(3).required(),
      birthday: Joi.string().length(10).required(),
      type: Joi.string().min(3).required(),
      comments: Joi.string().min(3).required(),
      photoURL: Joi.string().uri().required(),
      photoId: Joi.string(),
    })
    .validate(data);
