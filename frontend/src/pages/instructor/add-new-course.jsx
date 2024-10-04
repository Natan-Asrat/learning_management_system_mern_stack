import React from 'react'
import {Button} from '@/components/ui/button';
import CourseLanding from '../../components/instructor-view/courses/add-new-course/course-landing';
import CourseCurriculum from '../../components/instructor-view/courses/add-new-course/course-curriculum'; 
import CourseSettings from '../../components/instructor-view/courses/add-new-course/course-settings';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Card, CardContent} from '@/components/ui/card'

const AddNewCoursePage = () => {
  return (
    <div className="container mx-auto p-4">
        <div className="flex justify-between">
            <h1 className="text-3xl font-extrabold mb-5">
                Create a new course
            </h1>
            <Button className="text-sm tracking-wider font-bold-px-8">
                SUBMIT
            </Button>
           
        </div>
        <Card>
                <CardContent>
                    <div className="container mx-auto p-4">
                        <Tabs defaultValue="curriculum" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="curriculum">
                                    Curriculum
                                </TabsTrigger>
                                <TabsTrigger value="course-landing-page">
                                    Course Landing Page
                                </TabsTrigger>
                                <TabsTrigger values="settings">
                                    Settings
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="curriculum">
                                <CourseCurriculum/>
                            </TabsContent>
                            <TabsContent value="course-landing-page">
                                <CourseLanding/>
                            </TabsContent>
                            <TabsContent values="settings">
                                <CourseSettings/>
                            </TabsContent>
                        </Tabs>
                    </div>
                </CardContent>
            </Card>
    </div>
  )
}

export default AddNewCoursePage