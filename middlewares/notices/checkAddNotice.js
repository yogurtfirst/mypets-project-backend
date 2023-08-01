const { catchAsync, AppError, checkDate } = require("../../utils");
const { addNoticeValidator } = require("../../services/notices");
const addPetEnum = require("../../constants/noticeTypeEnum");

exports.checkAddNotice = catchAsync(async (req, res, next) => {
  if (!req.body.photoURL) {
    const photoURL = `${req.protocol}://${req.get(
      "host"
    )}/pets/default_pet.jpg`;
    req.body.photoURL = photoURL;
  }

  if(req.body.noticeType === addPetEnum.SELL && !req.body.price) throw new AppError(400, "The price field is reqiured for notice type 'sell'") 
  if(req.body.noticeType !== addPetEnum.SELL && req.body.price) throw new AppError(400, "The price field is not able to use for notice types 'lost-or-found' or 'in-good-hands'")
  
  const { error, value } = addNoticeValidator(req.body);

  if (error) return next(new AppError(400, error.message));
  if(!checkDate(value.birthday)) throw new AppError(400, "The birthday couldn't be in future")

  req.body = value;

  next();
});
