const path = require('path')
const { readFile } = require('fs/promises')
const { catchAsync } = require('../../utils')

const getNews = catchAsync(async (req, res) => {
    const newsPath = path.join('externalSources', 'news.json')

    if (!req.query.search) req.query.search = ''

    const searchQuery = req.query.search.trim()

    const { page = 1, limit = 6 } = req.query;
    const skip = (page - 1) * limit;
    
    const getNews = JSON.parse(await readFile(newsPath))

    const searchResult = getNews.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.text.toLowerCase().includes(searchQuery.toLowerCase()))

    const getSortResult = searchResult.sort((a, b) => new Date(a.date) - new Date(b.date))

    const paginatedResult = getSortResult.slice(skip, skip + limit);

    res.status(200).json({
        total: searchResult.length,
        data: paginatedResult
    })
})

module.exports = {
    getNews
}