const mongoose = require('mongoose');


const studentCoursesSchema = new mongoose.Schema({
    userId: String,
    courses: [
        {
            courseId: String,
            title: String,
            instructorId: String,
            instructorName: String,
            dateOfPurchase : Date,
            courseImage: String
        }
    ]


}) 


module.exports = mongoose.model('StudentCourses', studentCoursesSchema);