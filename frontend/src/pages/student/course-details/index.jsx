import { useContext, useEffect, useState } from "react";
import { StudentContext } from "../../../context/student-context";
import { useLocation, useParams } from "react-router-dom";
import { fetchInstructorCourseDetailsService } from "../../../services";
import {Skeleton} from '@/components/ui/skeleton';
import {Globe, CheckCircle, PlayCircle, Lock} from 'lucide-react';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import VideoPlayer from "../../../components/video-player";
import {Button} from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
  } from "@/components/ui/dialog"
  

function StudentCourseDetailsPage() {
    const {
        loading, setLoading,
        studentCourseDetails,
        setStudentCourseDetails,
        courseId,
        setCourseId} = useContext(StudentContext);
    const {id} = useParams();

    const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] = useState(null);
    const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
    useEffect(()=> {
        if(id){
            setCourseId(id);
        }
    }, [id])
    async function fetchStudentCourseDetails(id) {
        const response = await fetchInstructorCourseDetailsService(id);
        if(response?.success){
            setStudentCourseDetails(response?.data);
            setLoading(false);
        }else{
            setStudentCourseDetails(null);
            setLoading(false);
        }
    }

    const getIndexOfFreePreview = studentCourseDetails !==null ? 
        studentCourseDetails?.curriculum?.findIndex(item=> item.freePreview)
    : -1;
    useEffect(()=> {
        if(courseId!==null){
            fetchStudentCourseDetails(courseId)
        }
    }, [courseId])

    const location = useLocation();
    useEffect(() => {
        if(!location.pathname.includes('course/details')){
            setStudentCourseDetails(null);
            setCourseId(null);
            
        }
    }, [location.pathname])

    function handleSetFreePreview(curriculum){
        setDisplayCurrentVideoFreePreview(curriculum?.videoUrl)
    }

    useEffect(()=> {
        if(displayCurrentVideoFreePreview!==null){
            setShowFreePreviewDialog(true);
        }
    }, [displayCurrentVideoFreePreview])

    if(loading) return <Skeleton />
    return ( 
        <div className="mx-auto p-4">
            <div className="bg-gray-900 text-white p-8 rounded-t-lg">
                <h1 className="text-3xl font-bold mb-4">
                    {studentCourseDetails?.title}
                </h1>
                <p className="text-xl mb-4">
                    {studentCourseDetails?.subtitle}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                    <span>Created by {studentCourseDetails?.instructorName}</span>
                    <span>Created on {studentCourseDetails?.date.split('T')[0]}</span>
                    <span className="flex items-center">
                        <Globe 
                        className="mr-1 h-4 w-4"

                        />
                        {studentCourseDetails?.primaryLanguage}
                    </span>
                    <span>
                        {studentCourseDetails?.students.length} {studentCourseDetails?.students.length==1 ? 'Student' : 'Students'}
                    </span>
                </div>
                

            </div>
            <div className="flex flex-col md:flex-row gap-8 mt-8">
                    <main className="flex-grow">
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>
                                What you'll learn
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {
                                    studentCourseDetails?.objectives.split(',').map((objective, index) => <li key={index} className="flex items-start">
                                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0"/>
                                        <span>{objective}</span>
                                    </li>)
                                }
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>
                                Course Description
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            
                    {studentCourseDetails?.description}
                
                        </CardContent>
                    </Card>
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>
                                Course Curriculum
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                                {
                                    studentCourseDetails?.curriculum.map((item, index) => 
                                    <li 
                                    key={index} 
                                    className={`${item?.freePreview ? 'cursor-pointer' : 'cursor-not-allowed'} flex items-center mb-4`}
                                    onClick={item?.freePreview ? ()=> handleSetFreePreview(item) : null}
                                    >
                                        {
                                            item?.freePreview ?
                                            <PlayCircle 
                                            className="mr-2 h-4 w-4"
                                            /> : <Lock />

                                        }
                                        <span>{item?.title}</span>
                                    </li>)
                                }
                        </CardContent>
                    </Card>
                    </main>
                    <aside className="flex-grow">
                        <Card className="sticky top-4">
                            <CardContent className="p-6">
                                <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                                    <VideoPlayer
                                    url={
                                        getIndexOfFreePreview !== -1 ? 
                                        studentCourseDetails?.curriculum[getIndexOfFreePreview].videoUrl : ''
                                    }
                                    width="450px"
                                    height="250px"
                                    />
                                </div>
                                <div className="mb-4">
                                    <span className="text-3xl font-bold">
                                        ${studentCourseDetails?.pricing}
                                    </span>
                                </div>
                                <Button className="w-full">
                                    Buy Now
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>
            </div>
            <Dialog open={showFreePreviewDialog} onOpenChange={() => {
                setDisplayCurrentVideoFreePreview(null);
                setShowFreePreviewDialog(false);
                }}>
                <DialogContent className="w-[600px]">
                    <DialogHeader>
                    <DialogTitle>Course Preview</DialogTitle>
                    
                    </DialogHeader>
                    <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                                    <VideoPlayer
                                    url={
                                        displayCurrentVideoFreePreview
                                    }
                                    width="450px"
                                    height="250px"
                                    />
                                </div>
                        <div className="flex flex-col gap-2">
                            {
                                studentCourseDetails?.curriculum?.filter(item=> item.freePreview).map((item, index) => 
                                <p 
                                onClick = {()=> handleSetFreePreview(item)}
                                className="cursor-pointer text-[16px] font-medium" key={index}>{item?.title}</p>
                            )
                            }
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                </DialogContent>
                </Dialog>

        </div>
     );
}

export default StudentCourseDetailsPage;