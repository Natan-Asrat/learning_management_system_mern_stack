const express = require('express');

const {getCurrentCourseProgress} = require('../../controllers/student-controller/progress-controller');

const router = express.Router();

router.get('/course-progress/:userId/:courseId', getCurrentCourseProgress);


module.exports = router;