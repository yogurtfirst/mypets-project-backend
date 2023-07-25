const Joi = require("joi");
const noticeTypeEnum = require("../../constants/noticeTypeEnum");

exports.listNoticesValidator = (data) =>
  Joi.object()
    .keys({
      noticeType: Joi.string().valid(...Object.values(noticeTypeEnum)),
      favorite: Joi.boolean(),
    })
    .or("noticeType", "favorite")
    .validate(data);
