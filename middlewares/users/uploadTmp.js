const multer = require('multer');
const path = require('path');

const pathDir = path.join(__dirname, '../../', 'tmp');

const multerConfig = multer.diskStorage({
    destination: pathDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const uploadTmp = multer({
    storage: multerConfig,
})
module.exports = {
    uploadTmp
}