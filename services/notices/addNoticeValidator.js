const Joi = require("joi");
const noticeTypeEnum = require("../../constants/noticeTypeEnum");
const petSexEnum = require("../../constants/petSexEnum");

exports.addNoticeValidator = (data) =>
  Joi.object()
    .keys({
      noticeType: Joi.string()
        .valid(...Object.values(noticeTypeEnum))
        .required(),
      title: Joi.string().min(3).required(),
      name: Joi.string().min(3).required(),
      birthday: Joi.string().length(10).required(),
      petType: Joi.string().min(3).required(),
      sex: Joi.string()
        .valid(...Object.values(petSexEnum))
        .required(),
      location: Joi.string().min(3).required(),
      price: Joi.number(),
      comments: Joi.string().min(3).required(),
      photoURL: Joi.string().uri().required(),
    })
    .validate(data);
