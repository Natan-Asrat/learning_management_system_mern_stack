import React, { createContext, useState } from "react";

export const StudentContext = createContext(null);

const StudentProvider = ({ children }) => {
  const [studentCoursesList, setStudentCoursesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [studentCourseDetails, setStudentCourseDetails] = useState(null);
  const [courseId, setCourseId] = useState(null);

  const [studentBoughtCoursesList, setStudentBoughtCoursesList] = useState([]); 

  return (
    <StudentContext.Provider
      value={{
        studentCoursesList,
        setStudentCoursesList,
        loading,
        setLoading,
        studentCourseDetails,
        setStudentCourseDetails,
        courseId,
        setCourseId,
        studentBoughtCoursesList, setStudentBoughtCoursesList,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
