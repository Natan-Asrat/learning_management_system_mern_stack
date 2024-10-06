import React, { createContext, useState } from "react";

export const StudentContext = createContext(null);

const StudentProvider = ({ children }) => {
  const [studentCoursesList, setStudentCoursesList] = useState([]);

  return (
    <StudentContext.Provider value={{ studentCoursesList, setStudentCoursesList }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;