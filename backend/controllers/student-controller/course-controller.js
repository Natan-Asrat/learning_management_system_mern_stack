const course = require('../../models/course');
const Course = require('../../models/course');
const { getCourseDetailsById } = require('../instructor-controller/course-controller');



const getAllStudentViewCourses = async (request, response) => {
    try{
        const {category=[], level=[], primaryLanguage=[], sortBy="price-lowtohigh"} = request.query;
        let filters = {};
        if(category.length){
            filters.category = { $in: category.split(',') }
        }
        if(level.length){
            filters.level = { $in: level.split(',') }
        }
        if(primaryLanguage.length){
            filters.primaryLanguage = { $in: primaryLanguage.split(',') }
        }
        let sort = {};
        switch(sortBy){
            case 'price-lowtohigh':
                sort.pricing = 1;
                break;
            case 'price-hightolow':
                sort.pricing = -1;
                break;
            
            case 'title-atoz':
                sort.title = 1;
                break;
            
            case 'title-ztoa':
                sort.title = -1;
                break;
            default:
                sort.pricing = 1;
                break;
        }
        const coursesList = await Course.find(filters).sort(sort);
       
        return response.status(200).json({ success: true, data: coursesList})

    }catch(error){
        console.log(error)
        return response.status(500).json({ success: false, message: "Internal Server Error"})
    }
}

const getStudentViewCourseDetails = async (request, response) => {
    try{
        const {id} = request.params;
        const courseDetails = await Course.findById(id);
        if(!courseDetails){
            return response.status(404).json({ success: false, message: "Course not found", data: null})
        }
        return response.status(200).json({ success: true, data: courseDetails})
        
    }catch(error){
        console.log(error)
        return response.status(500).json({ success: false, message: "Internal Server Error"})
    }
}

module.exports = {
    getAllStudentViewCourses,
    getStudentViewCourseDetails
}