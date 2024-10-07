const express = require('express');
const {getAllStudentViewCourses,
    checkCoursePurchased,
    getStudentViewCourseDetails} = require('../../controllers/student-controller/course-controller');
const router = express.Router();

router.get("/get", getAllStudentViewCourses)
router.get("/detail/:id", getStudentViewCourseDetails)
router.get("/purchase_info/:studentId/:id", checkCoursePurchased)
module.exports = router;