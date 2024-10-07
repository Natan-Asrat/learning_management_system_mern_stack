import React, { useEffect, useState } from "react";
import { Users, DollarSign } from "lucide-react";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";

const InstructorDashboardComponent = ({ listOfCourses }) => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [studentsList, setStudentsList] = useState([]);
  const [config, setConfig] = useState([]);

  useEffect(() => {
    const data = calculateTotalStudentsAndProfit();
    setStudentsList(data.studentList);
    setTotalUsers(data.totalStudents);
    setTotalProfit(data.totalProfit);
    
    setConfig([
      {
        icon: Users,
        label: "Total Students",
        value: data.totalStudents, 
      },
      {
        icon: DollarSign,
        label: "Total Profit",
        value: data.totalProfit, 
      },
    ]);
  }, [listOfCourses]); 

  function calculateTotalStudentsAndProfit() {
    const { totalStudents, totalProfit, studentList } = listOfCourses.reduce(
      (acc, course) => {
        const studentCount = course.students.length;
        acc.totalStudents += studentCount;
        acc.totalProfit += course.pricing * studentCount;
        course.students.forEach(student => {
          acc.studentList.push({
            courseTitle: course.title,
            studentName: student.studentName,
            studentEmail: student.studentEmail,
          });
        });
        return acc;
      },
      {
        totalStudents: 0,
        totalProfit: 0,
        studentList: [],
      }
    );
    return { totalStudents, totalProfit, studentList };
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
        {config.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.label}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {item.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            Students List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentsList.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>{student.courseTitle}</TableCell>
                    <TableCell>{student.studentName}</TableCell>
                    <TableCell>{student.studentEmail}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorDashboardComponent;
