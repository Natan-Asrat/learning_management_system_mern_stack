const express = require('express');

const {getCurrentCourseProgress,
    resetCurrentCourseProgress,
    markCurrentLectureAsViewed

} = require('../../controllers/student-controller/progress-controller');

const router = express.Router();

router.get('/course-progress/:userId/:courseId', getCurrentCourseProgress);
router.post('/lecture-viewed', markCurrentLectureAsViewed);
router.post('/reset-progress', resetCurrentCourseProgress);

module.exports = router;