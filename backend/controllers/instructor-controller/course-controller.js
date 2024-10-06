const Course = require('../../models/course');

const addNewCourse = async (request, response) => {
    try{
        const courseData = request.body;
        const newCourse = new Course(courseData);
        const saveCourse = await newCourse.save();
        if(saveCourse){
            return response.status(201).json({
                success: true,
                message: 'New course added successfully',
                data: saveCourse
            })
        }else{
            return response.status(500).json({
                success: false,
                message: 'Some error occured'
            })
        }
        

    }catch(e){
        console.log(e);
        return response.status(500).json({
            success: false,
            message: 'Some error occured'
        })

    }
};

const getAllCourses = async (request, response) => {
    try{
        const coursesList = await Course.find({});
        return response.status(200).json({
            success: true,
            data: coursesList
        })

    }catch(e){
        console.log(e);
        return response.status(500).json({
            success: false,
            message: 'Some error occured'
        })

    }
};

const getCourseDetailsById = async (request, response) => {
    try{
        const {id} = request.params;
        const courseDetails = await Course.findById(id);
        if(!courseDetails){
            return response.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }
        return response.status(200).json({
            success: true,
            data: courseDetails
        })

    }catch(e){
        console.log(e);
        return response.status(500).json({
            success: false,
            message: 'Some error occured'
        })

    }
};
const updateCourseById = async (request, response) => {
    try{
        const {id} = request.params;
        const updatedCourseData = request.body;
        const updatedCourse = await Course.findByIdAndUpdate(id, updatedCourseData, {new: true});
        if(!updatedCourse){
            return response.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }
        return response.status(200).json({
            success: true,
            message: 'Course updated successfully',
            data: updatedCourse
        })



    }catch(e){
        console.log(e);
        return response.status(500).json({
            success: false,
            message: 'Some error occured'
        })

    }
};


module.exports = {addNewCourse, getAllCourses, getCourseDetailsById, updateCourseById}