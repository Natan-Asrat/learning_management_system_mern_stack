import React, { useContext } from 'react'
import { InstructorContext } from '../../../../context/instructor-context'
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Switch} from '@/components/ui/switch'  
import {Label} from '@/components/ui/label'
import { courseCurriculumInitialFormData } from '../../../../config'
import { mediaUploadService } from '../../../../services'
const CourseCurriculum= () => {
  const {
    courseCurriculumFormData, setCourseCurriculumFormData,
    mediaUploadProgress, setMediaUploadProgress
  } = useContext(InstructorContext);
  function handleNewLecture(){
    console.log(courseCurriculumFormData)
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0]
      }
    ])
  }

  function handleCourseTitleChange(event, index){
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData]
    cpyCourseCurriculumFormData[index] = {
      ...cpyCourseCurriculumFormData[index],
      title: event.target.value
    } 
    console.log(cpyCourseCurriculumFormData)
    setCourseCurriculumFormData(cpyCourseCurriculumFormData)
  }

  function handleFreePreviewChange(value, index) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData]
    cpyCourseCurriculumFormData[index] = {
      ...cpyCourseCurriculumFormData[index],
      freePreview: value
    } 
    setCourseCurriculumFormData(cpyCourseCurriculumFormData)
  
  }

  async function handleSingleLectureUpload(event, index) {
    const selectedFile = event.target.files[0];
    if(selectedFile){
      const videoFormData = new FormData();
      videoFormData.append('file', selectedFile);
      try{

        setMediaUploadProgress(true);
        const response = await mediaUploadService(videoFormData);
        if(response.success){
          let cpyCourseCurriculumFormData = [...courseCurriculumFormData]
          cpyCourseCurriculumFormData[index] = {
            ...cpyCourseCurriculumFormData[index],
            videoUrl: response?.data?.url,
            public_id: response?.data?.public_id
          } 
          setCourseCurriculumFormData(cpyCourseCurriculumFormData)
          
          setMediaUploadProgress(false);
        }
      } catch(error){
        console.log(error)
      }

    }
  }
  console.log(courseCurriculumFormData)


  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Create Course Curriculum
        </CardTitle>
        
      </CardHeader>
      <CardContent>
          <Button
          onClick={handleNewLecture}
          >
            Add Lecture
          </Button>
          <div className="mt-4 space-y-4">
            {courseCurriculumFormData.map((curriculumItem, index) => <div className='border p-5 rounded-md'>
              <div key={`lecture-${index}-`} className="flex gap-5 items-center">
                <h3 className="font-semibold">
                  Lecture {index+1}
                </h3>
                <Input 
                name={`title-${index+1}`}
                placeholder="Enter lecture title"
                className="max-w-96"
                onChange={
                  (event) => handleCourseTitleChange(event, index)
                }
                value={courseCurriculumFormData[index]?.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                  checked={courseCurriculumFormData[index]?.freePreview}
                  onCheckedChange={(value) => handleFreePreviewChange(value, index)}
                  id={`freePreview-${index+1}`}

                  />
                  <Label htmlFor={`freePreview-${index+1}`}>
                    Free Preview
                  </Label>
                </div>
                
              </div>
              <div className="mt-6">
                  <Input
                  type="file"
                  accept="video/*"
                  className="mb-4"
                  onChange={(event) => handleSingleLectureUpload(event, index)}
                  />
                </div>
              </div>)}
          </div>
        </CardContent>
    </Card>
  )
}

export default CourseCurriculum
