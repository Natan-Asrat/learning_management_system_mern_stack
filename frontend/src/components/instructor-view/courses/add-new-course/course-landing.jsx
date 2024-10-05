import React, { useContext } from 'react'
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import { courseLandingPageFormControls } from '../../../../config';
import { InstructorContext } from '../../../../context/instructor-context';
import FormControls from '@/components/common-form/form-controls'

const CourseLanding = () => {
  const {courseLandingFormData , setCourseLandingFormData} = useContext(InstructorContext);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Course Landing Page
        </CardTitle>
        
      </CardHeader>
      <CardContent>
        <FormControls 
          formControls={courseLandingPageFormControls}
          formData = {courseLandingFormData}
          setFormData = {setCourseLandingFormData}
        />
      </CardContent>
    </Card>
  )
}

export default CourseLanding