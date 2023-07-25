const path = require('path')
const { readFile } = require('fs/promises')
const { catchAsync } = require('../../utils')

const news = catchAsync(async (req, res) => {
    const newsPath = path.join('externalSources', 'news.json')
    
    const news = JSON.parse(await readFile(newsPath))

    res.status(200).json({news})
})

module.exports = {
    news
}