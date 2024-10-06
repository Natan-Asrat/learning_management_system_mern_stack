import React, { createContext, useState } from "react";

export const StudentContext = createContext(null);

const StudentProvider = ({ children }) => {
  const [studentCoursesList, setStudentCoursesList] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <StudentContext.Provider value={{ studentCoursesList, setStudentCoursesList, loading, setLoading }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;