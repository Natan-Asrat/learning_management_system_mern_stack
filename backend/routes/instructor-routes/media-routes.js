const express = require('express'); 
const multer = require('multer');   
const {uploadMediaToCloudinary, deleteMediaFromCloudinary} = require("../../helpers/cloudinary");
const router = express.Router();

const upload = multer({dest: 'uploads/'});
router.post('/upload', upload.single('file'), async (request, response) => {
    try{
        const result = await uploadMediaToCloudinary(request.file.path);
        return response.status(200).json({
            success: true,
            data: result
        })

    }catch(error){ 
        console.log(error);
        return response.status(500).json({
            success: false,
            message: 'Error uploading file'
        })
    }
})


router.delete('/delete/:id', async (request, response) => {
    try{
        const {id} = request.params;
        if(!id){
            return response.status(400).json({
                success: false,
                message: 'Asset id required'
            })
            
        }
        await deleteMediaFromCloudinary(id);
        return response.status(200).json({
            success: true,
            message: 'Asset deleted successfully'
        })
    }catch(error){
        console.log(error);
        return response.status(500).json({
            success: false,
            message: 'Error deleting file'
        })
    }
})


module.exports = router;