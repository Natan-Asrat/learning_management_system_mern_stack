import React, { useContext, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";
import { StudentContext } from "../../../context/student-context";
import { getCurrentCourseProgressService, markLectureAsViewedService, resetCourseProgressService } from "../../../services";
import { Confetti } from "react-confetti";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import VideoPlayer from "../../../components/video-player";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
const StudentViewCourseProgressPage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [studentCourseProgress, setStudentCourseProgress] = useState(null);
  useContext(StudentContext);
  const { id } = useParams();
  const [lockCourse, setLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] =
    useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  async function fetchCurrentCourseProgress() {
    const response = await getCurrentCourseProgressService(auth?.user?._id, id);
    if (response?.success) {
      if (!response?.data?.isPurchased) {
        setLockCourse(true);
      } else {
        setLockCourse(false);
        setStudentCourseProgress({
          courseDetails: response?.data?.courseDetails,
          progress: response?.data?.progress,
        });
      }
      if (response?.data?.completed) {
        setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
        setShowCourseCompleteDialog(true);
        setShowConfetti(true);
        return;
      }
      if (response?.data?.progress.length === 0) {
        setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
      }else{
        const lastIndex = response?.data?.progress.reduceRight(
            (acc, obj, index) => {
              return acc === -1 && obj.viewed ? index : acc;
            },
            -1
          );
        setCurrentLecture(
            response?.data?.courseDetails?.curriculum[
                lastIndex + 1
            ]
          );

      }
    }
  }
  async function updateCourseProgress() {
    if(currentLecture !==null && typeof currentLecture._id !== "undefined"){
        const response = await markLectureAsViewedService(auth?.user?._id, id, currentLecture._id);
        if(response?.success){
            fetchCurrentCourseProgress();
        }
    }
  }
  async function handleRewatchCourse(){
    const response = await resetCourseProgressService(auth?.user?._id, studentCourseProgress?.courseDetails?._id)
    if(response?.success){
        setCurrentLecture(null);
        setShowConfetti(false);

        setShowCourseCompleteDialog(false);
        fetchCurrentCourseProgress();
    }
}
  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [id]);
  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
  }, [showConfetti]);
  useEffect(()=> {
    if(currentLecture?.progressValue===1){
        updateCourseProgress();
    }

  }, [currentLecture])
  function handleProgressUpdateCallback(progress){
    setCurrentLecture({
        ...currentLecture,
        progressValue: progress,
      });
  }
  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
      {showConfetti && <Confetti />}
      <div className="flex items-center justify-between bg-[#1c1d1f] p-4 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate("/student-courses")}
            className="text-black bg-white"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to My Courses Page
          </Button>
          <h1 className="text-lg font-bold hidden md:block">
            {studentCourseProgress?.courseDetails?.title}
          </h1>
        </div>
        <Button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
          {isSideBarOpen ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`flex-1 ${
            isSideBarOpen ? "mr-[400px]" : ""
          } transition-all duration-300`}
        >
            
          <VideoPlayer
            width="100%"
            height="500px"
            onProgressUpdate = {handleProgressUpdateCallback}
            progressUpdate = {currentLecture}
            url={currentLecture?.videoUrl}
          />

          <div className="p-6 bg-[#1c1d1f">
            <h2 className="text-2xl font-bold mb-2">{currentLecture?.title}</h2>
          </div>
        </div>
        <div
          className={`fixed top-[164px] right-0 bottom-0 w-[400px] bg-[#1c1d1f] border-gray-700 transition-all duration-300 ${
            isSideBarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid w-full bg-[#1c1d1f] grid-cols-2 p-0 h-14">
              <TabsTrigger value="content" className=" rounded-none h-full">
                Course Content
              </TabsTrigger>
              <TabsTrigger value="overview" className=" rounded-none h-full">
                Overview
              </TabsTrigger>

              
            </TabsList>
            <TabsContent value="content">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    {studentCourseProgress?.courseDetails?.curriculum.map(
                      (item) => (
                        <div
                          key={item._id}
                          className="flex items-center space-x-2 text-sm text-white font-bold cursor-pointer"
                        >
                            {studentCourseProgress?.progress?.find(
                          (progressItem) => progressItem.lectureId === item._id
                        )?.viewed ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Play className="h-4 w-4 " />
                        )}
                          <span>{item?.title}</span>
                        </div>
                      )
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="overview" className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <h2 className="text-xl text-white font-bold mb-4">
                      About this course
                    </h2>
                    <p className="text-gray-400">
                      {studentCourseProgress?.courseDetails?.description}
                    </p>
                  </div>
                </ScrollArea>
              </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={lockCourse}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>You can't view this page</DialogTitle>
            <DialogDescription>
              Please purchase this course to get access.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={showCourseCompleteDialog}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription className="flex flex-col gap-3">
              <Label>You have completed the course.</Label>
              <div className="flex flex-row gap-3">
                <Button onClick={() => navigate("/student-courses")}>
                  My Courses Page
                </Button>
                <Button onClick={handleRewatchCourse}>Rewatch Course</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentViewCourseProgressPage;
