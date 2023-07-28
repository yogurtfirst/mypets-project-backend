const dateFns = require("date-fns");
const { Notices } = require("../../models");
const { catchAsync } = require("../../utils");
const noticeTypeEnum = require("../../constants/noticeTypeEnum");
const petSexEnum = require("../../constants/petSexEnum");
const ageFilterEnum = require("../../constants/ageFilterEnum");

exports.listNotices = catchAsync(async (req, res) => {
  let noticeType;
  const userId = req.userId;

  Object.values(noticeTypeEnum).includes(req.query.type)
    ? (noticeType = req.query.type)
    : (noticeType = noticeTypeEnum.SELL);

  let ageFilter;

  Array.of(req.query.age).every((ageFilter) =>
    Object.values(ageFilterEnum).includes(ageFilter)
  )
    ? (ageFilter = req.query.age)
    : (ageFilter = undefined);

  let sexFilter;
  Object.values(petSexEnum).includes(req.query.sex)
    ? (sexFilter = req.query.sex)
    : (sexFilter = ["male", "female"]);

  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  let notices = await Notices.find({
    noticeType,
    sex: sexFilter,
  })
    .sort("-createdAt")
    .lean();

  notices = notices.map((notice) => {
    if (userId) {
      const isInArray = notice.favorite.some(function (favorite) {
        return favorite.equals(userId);
      });
      if (isInArray) {
        notice = { ...notice, isFavorite: true };
      } else {
        notice = { ...notice, isFavorite: false };
      }
    }

    const ageInMonths = dateFns.differenceInMonths(
      new Date(),
      new Date(notice.birthday)
    );

    if (ageInMonths >= 3 && ageInMonths <= 12)
      notice.category = ageFilterEnum.threeToTwelweMonths;
    if (ageInMonths > 12 && ageInMonths < 24)
      notice.category = ageFilterEnum.upToOneYear;
    if (ageInMonths >= 24) notice.category = ageFilterEnum.upToTwoYears;

    if (ageInMonths < 12) {
      notice.age = `${ageInMonths} months`;
    } else {
      notice.age = `${Math.floor(ageInMonths / 12)} years`;
    }
    notice.favorite = notice.favorite.length;
    const {
      noticeType,
      title,
      sex,
      location,
      photoURL,
      favorite,
      isFavorite,
      age,
      category,
    } = notice;
    return {
      noticeType,
      title,
      sex,
      location,
      photoURL,
      favorite,
      isFavorite,
      age,
      category,
    };
  });

  if (ageFilter)
    notices = notices.filter((notice) => ageFilter.includes(notice.category));

  const paginatedNotices = notices.slice(skip, skip + limit);

  res.status(200).json({
    data: paginatedNotices,
    total: notices.length,
  });
});
