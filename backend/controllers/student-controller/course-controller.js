const course = require('../../models/course');
const Course = require('../../models/course');
const { getCourseDetailsById } = require('../instructor-controller/course-controller');



const getAllStudentViewCourses = async (request, response) => {
    try{
        const coursesList = await Course.find({});
        if(coursesList.length === 0){
            return response.status(404).json({ success: false, message: "No courses found", data: []})
        }
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