const Jimp = require("jimp");
const { uploadCloudinary, deleteOnCloudinary } = require('../../services/cloudinary');
const fs = require('fs/promises');

const updateImage = async (req, res, next) => {

    if (req.file) {

        const { path: tempUpload } = req.file;
        const { avatarID: oldID } = req.user
        
        const file = await Jimp.read(tempUpload);
        await file.resize(250, 250).writeAsync(tempUpload);

        if(oldID) await deleteOnCloudinary(oldID)

        const { url: avatarURL, public_id: avatarID } = await uploadCloudinary(tempUpload)
        
        await fs.unlink(tempUpload);

        req = { ...req.user, avatarURL, avatarID }

    }
    next()
}

module.exports = {
    updateImage
}