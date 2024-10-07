const StudentCourses = require("../../models/student_courses");

const getCoursesByStudentId = async (request, response) => {
  try {
    const { studentId } = request.params;
    const studentCourses = await StudentCourses.findOne({ userId: studentId });
    return response.status(200).json({
      success: true,
      data: studentCourses,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


module.exports = {getCoursesByStudentId}