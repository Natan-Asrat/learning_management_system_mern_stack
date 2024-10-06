const express = require('express');
const {getAllStudentViewCourses,
    getStudentViewCourseDetails} = require('../../controllers/student-controller/course-controller');
const router = express.Router();

router.get("/get", getAllStudentViewCourses)
router.get("/detail/:id", getStudentViewCourseDetails)

module.exports = router;