const { Notices } = require("../../models");
const { catchAsync } = require("../../utils");

exports.listFavorites = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const favorites = await Notices.find({ favorite: userId });

  if (favorites.length === 0)
    return res.status(200).json({
      data: [], total: 0,
    });

  const paginatedFavorites = favorites.slice(skip, skip + limit);

  res.status(200).json({ data: paginatedFavorites, total: favorites.length });
});
