const dateFns = require("date-fns");
const ageFilterEnum = require("../../constants/ageFilterEnum");
const petSexEnum = require("../../constants/petSexEnum");
const { Notices } = require("../../models");
const { catchAsync } = require("../../utils");

exports.listMyNotices = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const ageFilter = [];

  if (req.query.young) ageFilter.push(ageFilterEnum.youngerOneYear);
  if (req.query.middle) ageFilter.push(ageFilterEnum.olderOneYear);
  if (req.query.older) ageFilter.push(ageFilterEnum.olderTwoYears);

  const sexFilter = [];
  Object.values(petSexEnum).includes(req.query.sex)
    ? sexFilter.push(req.query.sex)
    : sexFilter.push(petSexEnum.MALE, petSexEnum.FEMALE);

  let searchQuery;
  req.query.search
    ? (searchQuery = req.query.search.trim())
    : (searchQuery = undefined);

  let notices = await Notices.find({
    sex: sexFilter,
    owner: userId,
  })
    .sort("-createdAt")
    .lean();

  if (searchQuery) {
    notices = notices.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.comments.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  notices = notices.map((notice) => {
    const isInArray = notice.favorite.some(function (favorite) {
      return favorite.equals(userId);
    });
    if (isInArray) {
      notice = { ...notice, isFavorite: true };
    } else {
      notice = { ...notice, isFavorite: false };
    }

    const ageInMonths = dateFns.differenceInMonths(
      new Date(),
      new Date(notice.birthday)
    );

    if (ageInMonths < 12) notice.category = ageFilterEnum.youngerOneYear;
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

  if (ageFilter.length > 0)
    notices = notices.filter((notice) => ageFilter.includes(notice.category));

  notices = notices.map((notice) => {
    notice.category = undefined;
    return notice;
  });

  const paginatedNotices = notices.slice(skip, skip + limit);

  res.status(200).json({ data: paginatedNotices, total: notices.length });
});
