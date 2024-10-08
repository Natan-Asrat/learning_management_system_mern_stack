import React, { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CourseLanding from "../../components/instructor-view/courses/add-new-course/course-landing";
import CourseCurriculum from "../../components/instructor-view/courses/add-new-course/course-curriculum";
import CourseSettings from "../../components/instructor-view/courses/add-new-course/course-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { InstructorContext } from "../../context/instructor-context";
import { AuthContext } from "@/context/auth-context";
import { addNewCourseService, fetchInstructorCourseDetailsService, updateCourseService } from "../../services";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "../../config";
import { useNavigate, useParams } from "react-router-dom";
const AddNewCoursePage = () => {
  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    currentEditedCourseId, setCurrentEditedCourseId
  } = useContext(InstructorContext);
  const { auth } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();
  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return value === "" || value === null || value === undefined;
  }
  function validateFormData() {
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false;
      }
    }
    let hasFreePreview = false;
    for (const item of courseCurriculumFormData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.public_id)
      ) {
        return false;
      } else {
        if (item.freePreview) {
          hasFreePreview = true;
        }
      }
    }
    return hasFreePreview;
  }

  useEffect(() => {
    if(params?.id){
        setCurrentEditedCourseId(params?.id);

    }else{
       setCurrentEditedCourseId(null); 
    }
  }, [params?.id])
  console.log(currentEditedCourseId)

  async function fetchCurrentCourseDetails(){
    const response = await fetchInstructorCourseDetailsService(currentEditedCourseId)
    if(response?.success){
        const setCourseFormData = Object.keys(courseLandingInitialFormData).reduce((acc, key) => {
            acc[key] = response?.data[key] || courseLandingInitialFormData[key]
            return acc;
        }, {});
        setCourseLandingFormData(setCourseFormData);
        setCourseCurriculumFormData(response?.data?.curriculum);

    }

  }
  useEffect(() => {
    if(currentEditedCourseId !==null){
        fetchCurrentCourseDetails();
    }
  }, [currentEditedCourseId])

  async function handleCreateCourse() {
    const courseFinalFormData = {
      instructorId: auth?.user?._id,
      instructorName: auth?.user?.userName,
      date: new Date(),
      ...courseLandingFormData,
      students: [],
      curriculum: courseCurriculumFormData,
      isPublished: true,
    };

    const response = 
    currentEditedCourseId !== null ?
    await updateCourseService(currentEditedCourseId, courseFinalFormData)
    :
    await addNewCourseService(courseFinalFormData);
    if (response?.success) {
      setCourseLandingFormData(courseLandingInitialFormData);
      setCourseCurriculumFormData(courseCurriculumInitialFormData);
      navigate(-1);
      setCurrentEditedCourseId(null);
    }
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold mb-5">{currentEditedCourseId !== null ? "Edit Course" : "Create a new course"}</h1>
        <Button
          disabled={!validateFormData()}
          className="text-sm tracking-wider font-bold-px-8"
          onClick={handleCreateCourse}
        >
          SUBMIT
        </Button>
      </div>
      <Card>
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="course-landing-page">
                  Course Landing Page
                </TabsTrigger>
                <TabsTrigger values="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                <CourseCurriculum />
              </TabsContent>
              <TabsContent value="course-landing-page">
                <CourseLanding />
              </TabsContent>
              <TabsContent values="settings">
                <CourseSettings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewCoursePage;
