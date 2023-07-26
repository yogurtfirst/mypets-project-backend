const { catchAsync } = require('../../utils')
const { News } = require('../../models')

const getNews = catchAsync(async (req, res) => {
    if (!req.query.search) req.query.search = ''

    const searchQuery = req.query.search.trim()

    const { page = 1, limit = 6 } = req.query;
    const skip = (page - 1) * limit;
    
    const getNews = await News.find()

    const searchResult = getNews.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.text.toLowerCase().includes(searchQuery.toLowerCase()))

    const getSortResult = searchResult.sort((a, b) => new Date(b.date) - new Date(a.date))

    const paginatedResult = getSortResult.slice(skip, skip + limit);

    res.status(200).json({
        total: searchResult.length,
        data: paginatedResult
    })
})

module.exports = {
    getNews
}