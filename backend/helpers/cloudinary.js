const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadMediaToCloudinary = async (filePath) => {
    filePath= filePath
    try{
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto'
        });
        fs.unlinkSync(filePath);
        return result;
    }catch(error){
        console.log(error);
        throw new Error('Error uploading media to cloudinary');
    }
}

const deleteMediaFromCloudinary = async (publicId) => {
    try{
        await cloudinary.uploader.destroy(publicId);
        
    }catch(error){
        console.log(error);
        throw new Error('Error deleting media from cloudinary');
    }
}

module.exports = {
    uploadMediaToCloudinary,
    deleteMediaFromCloudinary
}