import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input" 

const CourseSettings = () => {
  return (
   <Card>
    <CardHeader>
      <CardTitle>
        Course Settings
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-3">
        <Label>
          Upload Course Image
        </Label>
        <Input
        type="file"
        accept="image/*"
        >
        </Input>
      </div>
    </CardContent>
   </Card>
  )
}

export default CourseSettings