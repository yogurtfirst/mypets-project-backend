const dateFns = require("date-fns");
const { Notices } = require("../../models");
const { catchAsync } = require("../../utils");
const noticeTypeEnum = require("../../constants/noticeTypeEnum");
const petSexEnum = require("../../constants/petSexEnum");
const ageFilterEnum = require("../../constants/ageFilterEnum");

exports.listNotices = catchAsync(async (req, res) => {
  let noticeType;
  const userId = req.userId;

  Object.values(noticeTypeEnum).includes(req.query.category)
    ? (noticeType = req.query.category)
    : (noticeType = noticeTypeEnum.SELL);

  const ageFilter = [];

  if (req.query.young) ageFilter.push(ageFilterEnum.youngerOneYear)
  if (req.query.middle) ageFilter.push(ageFilterEnum.olderOneYear)
  if (req.query.older) ageFilter.push(ageFilterEnum.olderTwoYears)

  const sexFilter = [];
  Object.values(petSexEnum).includes(req.query.sex)
    ? (sexFilter.push(req.query.sex))
    : (sexFilter.push(petSexEnum.MALE, petSexEnum.FEMALE));

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
    } else {
      notice = { ...notice, isFavorite: false };
    }

    const ageInMonths = dateFns.differenceInMonths(
      new Date(),
      new Date(notice.birthday)
    );

    if (ageInMonths < 12)
      notice.category = ageFilterEnum.youngerOneYear;
    if (ageInMonths >= 12 && ageInMonths < 24)
      notice.category = ageFilterEnum.olderOneYear;
    if (ageInMonths >= 24) notice.category = ageFilterEnum.olderTwoYears;

    if (ageInMonths < 12) {
      notice.age = `${ageInMonths} months`;
    } else {
      notice.age = `${Math.floor(ageInMonths / 12)} years`;
    }
    notice.favorite = notice.favorite.length;

    return {
      id: notice._id,
      noticeType: notice.noticeType,
      title: notice.title,
      sex: notice.sex,
      location: notice.location,
      photoURL: notice.photoURL,
      favorite: notice.favorite,
      isFavorite: notice.isFavorite,
      age: notice.age,
      category: notice.category,
    };
  });

  if (ageFilter)
    notices = notices.filter((notice) => ageFilter.includes(notice.category));
  
  notices = notices.map((notice) => {
      notice.category = undefined
      return notice
  })

  const paginatedNotices = notices.slice(skip, skip + limit);

  res.status(200).json({
    data: paginatedNotices,
    total: notices.length,
  });
});
