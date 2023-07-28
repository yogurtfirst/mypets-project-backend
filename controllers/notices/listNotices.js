const dateFns = require("date-fns");
const { Notices } = require("../../models");
const { catchAsync } = require("../../utils");
const noticeTypeEnum = require("../../constants/noticeTypeEnum");
const ageFilterEnumEnum = require("../../constants/ageFilterEnum");
const petSexEnum = require("../../constants/petSexEnum");

exports.listNotices = catchAsync(async (req, res) => {
  let noticeType;
  const userId = req.userId;

  Object.values(noticeTypeEnum).includes(req.query.type)
    ? (noticeType = req.query.type)
    : (noticeType = noticeTypeEnum.SELL);

  const ageFilter = req.query.age;

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
      }
    }

    const ageInMonths = dateFns.differenceInMonths(
      new Date(),
      new Date(notice.birthday)
    );

    notice.categories = [];

    if (ageInMonths >= 3 && ageInMonths <= 12)
      notice.categories.push(ageFilterEnumEnum.threeToTwelweMonths);
    if (ageInMonths >= 12 && ageInMonths < 24)
      notice.categories.push(ageFilterEnumEnum.upToOneYear);
    if (ageInMonths >= 24)
      notice.categories.push(ageFilterEnumEnum.upToTwoYears);

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
      categories,
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
      categories,
    };
  });

  if (ageFilter)
    notices = notices.filter((notice) =>
      notice.categories.some((category) => ageFilter.includes(category))
    );

  const paginatedNotices = notices.slice(skip, skip + limit);

  res.status(200).json({
    data: paginatedNotices,
    total: notices.length,
  });
});
