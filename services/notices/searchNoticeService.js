const dateFns = require("date-fns");
const noticeTypeEnum = require("../../constants/noticeTypeEnum");
const ageFilterEnum = require("../../constants/ageFilterEnum");
const petSexEnum = require("../../constants/petSexEnum");
const { Notices } = require("../../models");

exports.searchNoticeService = async (userId, noticeType, query) => {
  if (!noticeType) {
    Object.values(noticeTypeEnum).includes(query.category)
      ? (noticeType = query.category)
      : (noticeType = noticeTypeEnum.SELL);
  }

  const ageFilter = [];

  if (query.young) ageFilter.push(ageFilterEnum.youngerOneYear);
  if (query.middle) ageFilter.push(ageFilterEnum.olderOneYear);
  if (query.older) ageFilter.push(ageFilterEnum.olderTwoYears);

  const sexFilter = [];
  Object.values(petSexEnum).includes(query.sex)
    ? sexFilter.push(query.sex)
    : sexFilter.push(petSexEnum.MALE, petSexEnum.FEMALE);

  let searchQuery;
  query.search
    ? (searchQuery = query.search.trim())
    : (searchQuery = undefined);

  const searchOptions = {};

  if (noticeType === noticeTypeEnum.FAVORITE) {
    searchOptions.favorite = userId;
  } else if (noticeType === noticeTypeEnum.MY_ADS) {
    searchOptions.owner = userId;
  } else {
    searchOptions.noticeType = noticeType;
  }

  if (sexFilter.length > 0) searchOptions.sex = sexFilter;

  let notices = await Notices.find(searchOptions).sort("-createdAt").lean();

  if (searchQuery) {
    notices = notices.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.comments.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  notices = notices.map((notice) => {
    if (userId) {
      const isOwned = notice.owner.equals(userId);
      const isInArray = notice.favorite.some(function (favorite) {
        return favorite.equals(userId);
      });
      notice = { ...notice, isFavorite: isInArray, isOwn: isOwned };
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
      isOwn: notice.isOwn,
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

  return notices;
};
