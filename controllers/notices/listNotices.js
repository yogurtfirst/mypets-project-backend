const dateFns = require("date-fns");
const { Notices } = require("../../models");
const { catchAsync } = require("../../utils");
const noticeTypeEnum = require("../../constants/noticeTypeEnum");
const filterByAgeEnum = require("../../constants/filterByAgeEnum");
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

  if (userId)
    notices = notices.map((notice) => {
      const isInArray = notice.favorite.some(function (favorite) {
        return favorite.equals(userId);
      });
      if (isInArray) {
        return { ...notice, isFavorite: true };
      }
      return notice;
    });

  notices = notices.map((notice) => {
    const ageInMonths = dateFns.differenceInMonths(
      new Date(),
      new Date(notice.birthday)
    );
    notice.categories = [];

    if (ageInMonths > 3 && ageInMonths <= 12)
      notice.categories.push(filterByAgeEnum.threeToTwelweMonths);
    if (ageInMonths < 12) notice.categories.push(filterByAgeEnum.upToOneYear);
    if (ageInMonths < 24) notice.categories.push(filterByAgeEnum.upToTwoYears);

    let age;
    if (ageInMonths < 12) {
      age = `${ageInMonths} months`;
    } else {
      age = `${Math.floor(ageInMonths / 12)} years`;
    }

    notice.favorite = notice.favorite.length;
    notice.age = age;
    return notice;
  });

  if (ageFilter)
    notices = notices.filter((notice) =>
      notice.categories.some((category) => ageFilter.includes(category))
    );

  const refactoredNotices = notices.map((notice) => {
    const {
      noticeType,
      title,
      sex,
      location,
      photoURL,
      favorite,
      isFavorite,
      age,
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
    };
  });

  const paginatedNotices = refactoredNotices.slice(skip, skip + limit);

  res.status(200).json({
    data: paginatedNotices,
    total: notices.length,
  });
});
