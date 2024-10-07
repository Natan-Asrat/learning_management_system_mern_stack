const CourseProgress = require("../../models/course_progress");
const Course = require("../../models/course");
const StudentCourses = require("../../models/student_courses");

const markCurrentLectureAsViewed = async (request, response) => {
  try {
    const { userId, courseId, lectureId } = request.body;
    let progress = await CourseProgress.findOne({ userId, courseId });
    if (!progress) {
      progress = new CourseProgress({
        userId,
        courseId,
        lecturesProgress: [{ lectureId, viewed: true, dateViewed: new Date() }],
      });
      await progress.save();
    } else {
      const lectureProgress = progress.lecturesProgress.find(
        (item) => item.lectureId === lectureId
      );
      if (lectureProgress) {
        lectureProgress.viewed = true;
        lectureProgress.dateViewed = new Date();
      } else {
        progress.lecturesProgress.push({
          lectureId,
          viewed: true,
          dateViewed: new Date(),
        });
      }
      await progress.save();
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return response.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    const allLecturesViewed =
      progress.lecturesProgress.length === course.curriculum.length &&
      progress.lecturesProgress.every((item) => item.viewed);

    if (allLecturesViewed) {
      progress.completed = true;
      progress.completionDate = new Date();
      await progress.save();
    }

    return response.status(200).json({
      success: true,
      message: "Lecture marked as viewed",
      data: progress,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const resetCurrentCourseProgress = async (request, response) => {
  try {
    const { userId, courseId } = request.body;
    const progress = await CourseProgress.findOne({ userId, courseId });
    if (!progress) {
      return response.status(404).json({
        success: false,
        message: "Course progress not found",
      });
    }
    
    progress.lecturesProgress = [];
    progress.completed = false;
    progress.completionDate = null;
    await progress.save();
    return response.status(200).json({
      success: true,
      message: "Course progress reset",
      data: progress,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getCurrentCourseProgress = async (request, response) => {
  try {
    const { userId, courseId } = request.params;
    const studentPurchasedCourses = await StudentCourses.findOne({ userId });
    if (studentPurchasedCourses) {
      const isCurrentCoursePurchasedByUser =
        studentPurchasedCourses?.courses?.findIndex(
          (item) => item.courseId === courseId
        ) > -1;
      if (!isCurrentCoursePurchasedByUser) {
        return response.status(200).json({
          success: true,
          data: {
            isPurchased: false,
          },
          message: "Course not purchased by user",
        });
      }
      const currentUserCourseProgress = await CourseProgress.findOne({
        userId,
        courseId,
      });
      if (
        !currentUserCourseProgress ||
        currentUserCourseProgress.lecturesProgress.length === 0
      ) {
        const course = await Course.findById(courseId);
        if (!course) {
          return response.status(404).json({
            success: false,
            message: "Course not found",
          });
        }
        return response.status(200).json({
          success: true,
          message: "No progress found, you can start watching the course",
          data: {
            courseDetails: course,
            progress: [],
            isPurchased: true,
          },
        });
      }

      const courseDetails = await Course.findById(courseId);

      return response.status(200).json({
        success: true,
        message: "Current course progress",
        data: {
          courseDetails,
          progress: currentUserCourseProgress.lecturesProgress,
          completed: currentUserCourseProgress.completed,
          completionDate: currentUserCourseProgress.completionDate,
          isPurchased: true,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getCurrentCourseProgress,
  resetCurrentCourseProgress,
  markCurrentLectureAsViewed,
};
