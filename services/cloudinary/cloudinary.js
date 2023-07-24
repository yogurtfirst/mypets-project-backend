const { CLOUD_NAME_CLOUDINARY, API_KEY_CLOUDINARY, API_SECRET_CLOUDINARY } = process.env;

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: CLOUD_NAME_CLOUDINARY,
    api_key: API_KEY_CLOUDINARY,
    api_secret: API_SECRET_CLOUDINARY,
});

const uploadCloudinary = async (tempUpload) => {
    try {
        const result = await cloudinary.uploader.upload(tempUpload);

        return result
    } catch (error) {
        console.log(error, 'error');
    }
}

const deleteOnCloudinary = async (id) => {
    try {
        const result = await cloudinary.uploader.destroy(id);
    
    return result
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    uploadCloudinary,
    deleteOnCloudinary
}