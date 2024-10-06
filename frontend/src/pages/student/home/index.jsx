import React, { useContext, useEffect } from "react";
import { courseCategories } from "../../../config";
import { Button } from "@/components/ui/button";
import { StudentContext } from "../../../context/student-context";
import { fetchStudentCourseListService } from "../../../services";
const StudentHomePage = () => {
  const { studentCoursesList, setStudentCoursesList } =
    useContext(StudentContext);

  async function fetchStudentCourseList() {
    const response = await fetchStudentCourseListService();
    if (response?.success) {
      setStudentCoursesList(response?.data);
    }
  }
  useEffect(() => {
    fetchStudentCourseList();
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl font-bold mb-4">Learning that gets you</h1>
          <p className="text-xl">
            Skills for your present and your future. Get started with US!
          </p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <img
            src="/banner.webp"
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>
      <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md grid-cols-4 gap-4">
          {courseCategories.map((item) => (
            <Button className="justify-start" variant="outline" key={item.id}>
              {item.label}
            </Button>
          ))}
        </div>
      </section>
      <section className="py-12 px-4 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">
          Featured Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {
            studentCoursesList && studentCoursesList.length > 0 ?
            studentCoursesList.map(item => <div className="border rounded-lg overflow-hidden shadow cursor-pointer">
              <img src={item?.image} 
              width={300}
              height={150}
               className="w-full h-40 object-cover" />
               <div className="p-4">
                <h3 className="font-bold mb-2">
                  {item?.title}
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  {item?.instructorName}
                </p>
                <p className="font-bold text-[16px]">
                  ${item?.pricing}
                </p>
               </div>
            </div>) : <h1>No Courses Found!</h1>
          }
        </div>
      </section>
    </div>
  );
};

export default StudentHomePage;
