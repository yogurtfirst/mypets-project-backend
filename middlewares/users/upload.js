const multer = require('multer');
const path = require('path');

const pathDir = path.join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
    destination: pathDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

exports.upload = multer({
    storage: multerConfig,
})
