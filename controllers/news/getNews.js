const path = require('path')
const { readFile } = require('fs/promises')
const { catchAsync } = require('../../utils')

const getNews = catchAsync(async (req, res) => {
    const newsPath = path.join('externalSources', 'news.json')

    if(!req.query.search) req.query.search = ''

    const searchQuery = req.query.search

    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    const getNews = JSON.parse(await readFile(newsPath))

    const searchResult = getNews.filter(item => item.title.includes(searchQuery))

    console.log(searchResult.length);

    const paginatedResult = searchResult.slice(skip, skip + limit);

    res.status(200).json({
        total: searchResult.length,
        data: paginatedResult
    })
})

module.exports = {
    getNews
}