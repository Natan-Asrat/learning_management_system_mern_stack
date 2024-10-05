import React, { useContext } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input" 
import { InstructorContext } from '../../../../context/instructor-context'
import { mediaUploadService } from '../../../../services'
import MediaProgressBar from '../../../media-progress-bar'

const CourseSettings = () => {
  const {
    courseLandingFormData, setCourseLandingFormData,
    mediaUploadProgressPercentage, setMediaUploadProgressPercentage,
    mediaUploadProgress, setMediaUploadProgress,
  
  } = useContext(InstructorContext)
  
  async function handleImageUploadChange(e) {
    const file = e.target.files[0]
    if(file){
      const formData = new FormData()
      formData.append('file', file)
      try{
        setMediaUploadProgress(true);

        const response = await mediaUploadService(formData, setMediaUploadProgressPercentage);
        if(response.success){
          setCourseLandingFormData({
            ...courseLandingFormData,
            image: response.data.url
        
          })
          setMediaUploadProgress(false);
        }
      }catch(error){
        console.log(error)
      }
    }
  }
  return (
   <Card>
    <CardHeader>
      <CardTitle>
        Course Settings
      </CardTitle>
    </CardHeader>
    <div className="p-4">
    {
            mediaUploadProgress ? 
            <MediaProgressBar
            isMediaUploading={mediaUploadProgress}
            progress={mediaUploadProgressPercentage}
            /> : null
          }
    </div>
    
    <CardContent>
      {
        courseLandingFormData?.image ? <img src={courseLandingFormData.image} /> 
        : 
        <div className="flex flex-col gap-3">
        <Label>
          Upload Course Thumbnail
        </Label>
        <Input
        type="file"
        accept="image/*"
        onChange={handleImageUploadChange}
        >
        </Input>
      </div>
      }
      
    </CardContent>
   </Card>
  )
}

export default CourseSettings