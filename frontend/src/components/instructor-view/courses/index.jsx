import React from 'react'
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Delete, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
  
const InstructorCourses = () => {
    const navigate = useNavigate();

  return (
    <Card>
        <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle className="text-3xl font-extrabold">
                All Courses
            </CardTitle>
            <Button onClick={() => navigate('/instructor/create-new-course')} className="p-6">
                Create New Course
            </Button>
        </CardHeader>
        <CardContent>
            <div className="overflow x-auto">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">
                        <Button 
                        size="sm"
                        variant="ghost">
                            <Edit className="h-6 w-6"/>
                        </Button>
                        <Button 
                        size="sm"
                        variant="ghost">
                            <Delete className="h-6 w-6"/>
                        </Button>
                    </TableCell>
                    </TableRow>
                </TableBody>
                </Table>

            </div>
        </CardContent>
    </Card>
  )
}

export default InstructorCourses