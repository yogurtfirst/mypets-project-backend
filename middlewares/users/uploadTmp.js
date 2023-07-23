const multer = require('multer');
const path = require('path');
const { AppError } = require('../../utils');

const pathDir = path.join(__dirname, '../../', 'tmp');

const multerConfig = multer.diskStorage({
    destination: pathDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const multerFilter = (req, file, cbk) => {
    if (file.mimetype.startsWith('image/')) {
      cbk(null, true)
    } else {
      cbk(new AppError(400, 'Please, upload images only!'), false)
    }
}

const uploadTmp = multer({
    storage: multerConfig,
    fileFilter: multerFilter,
})
module.exports = {
    uploadTmp
}