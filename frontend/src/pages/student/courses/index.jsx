import { ArrowUpDownIcon } from "lucide-react";
import {Button} from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuRadioItem, DropdownMenuContent, DropdownMenuRadioGroup } from "@/components/ui/dropdown-menu";
import { filterOptions, sortOptions } from "../../../config";
import { useContext, useEffect, useState } from "react";
import {Checkbox} from "@/components/ui/checkbox"
import {Label} from "@/components/ui/label" 
import { StudentContext } from "../../../context/student-context";
import { fetchStudentCourseListService } from "../../../services";
import { Card, CardContent, CardTitle} from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import {Skeleton} from "@/components/ui/skeleton";
function createSearchParamsHelper(filterParams) {
    const queryParams = [];
    if (!filterParams || typeof filterParams !== 'object') {
        return ''; // Return an empty string if filterParams is null or undefined
    }
    for (const [key, val] of Object.entries(filterParams)) {
        if (Array.isArray(val) && val.length > 0) {
            const paramValue = val.join(',');
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
        }
    }
    return queryParams.join('&');
}


function StudentCourses() {
    const [sort, setSort] = useState('price-lowtohigh');
    const [filters, setFilters] =  useState({});
    const { loading, setLoading, studentCoursesList, setStudentCoursesList } =
    useContext(StudentContext);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    async function fetchStudentCourseList(filters, sort) {
        const query = new URLSearchParams({
            ...filters,
            sortBy: sort
        })
        const response = await fetchStudentCourseListService(query);
        if (response?.success) {
          setStudentCoursesList(response?.data);
          setLoading(false);
        }
      }
      useEffect(() => {
        setSort('price-lowtohigh')
        setFilters(JSON.parse(sessionStorage.getItem('filters')))
      }, []
      );
      useEffect(()=> {
        return () => {
            sessionStorage.removeItem('filters');
        }
      }, []);
      useEffect(() => {
        if(filters !==null && sort!==null){
            fetchStudentCourseList(filters, sort);
            console.log('filters', filters,'sort', sort)
        }
      }, [filters, sort]);

    function handleFilterOnChange(section, option){
        let cpyFilters = {...filters}  
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(section);
        if(indexOfCurrentSection === -1){
            cpyFilters = {
                ...cpyFilters,
                [section] : [option.id]
            }
        }else{
            const indexOfCurrentOption = cpyFilters[section].indexOf(option.id);
            if(indexOfCurrentOption === -1){
                cpyFilters[section].push(option.id)
            }else{
                cpyFilters[section].splice(indexOfCurrentOption, 1)

            }
            
        }
        setFilters(cpyFilters);
        sessionStorage.setItem('filters', JSON.stringify(cpyFilters));
    }

    

    useEffect(()=> {
        const buildQueryString = createSearchParamsHelper(filters);
        setSearchParams(new URLSearchParams(buildQueryString))
    }, [filters])
    
    return ( 
    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">
            All courses
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
            <aside className="w-full md:w-64 space-y-4">
                <div className="space-y-4">
                    {
                        Object.keys(filterOptions).map(item => (
                            <div className="p-4 space-y-4" key={item}>
                                <h3 className="font-bold mb-3">{item.toUpperCase()}</h3>
                                <div className="grid gap-2 mt-2">
                                    {
                                        filterOptions[item].map(option => (
                                            <Label className="flex font-medium items-center gap-3" key={option.id}>
                                                <Checkbox 
                                                    checked={
                                                        filters && 
                                                        Object.keys(filters).length > 0 &&
                                                        filters[item]  &&
                                                        filters[item].indexOf(option.id) !== -1 
                                                    }
                                                    onCheckedChange={() => handleFilterOnChange(item, option)}
                                                />
                                                {option.label}
                                            </Label>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </aside>
            <main className="flex-1">
                <div className="flex justify-end items-center mb-4 gap-5">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-2 p-5">
                                <ArrowUpDownIcon
                                className="h-4 w-4"
                                />
                                <span
                                className="text-[16px] font-medium "
                                >
                                    Sort By</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px]">
                            <DropdownMenuRadioGroup value={sort} onValueChange={(value) => setSort(value)}>
                                {
                                    sortOptions.map(item => <DropdownMenuRadioItem value={item.id} key={item.id}>
                                        {item.label}
                                    </DropdownMenuRadioItem>)
                                }
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <span className="text-sm text-black font-bold">{studentCoursesList.length} Results</span>
                    
                </div>
                <div className="space-y-3">
                    {
                        studentCoursesList && studentCoursesList.length > 0 ?
                        
                        studentCoursesList.map(course=> (
                            <Card onClick={()=> navigate(`/course/details/${course?._id}`)} key={course?._id} className="cursor-pointer">
                                <CardContent className="flex gap-4 p-4">
                                    <div className="w-48 h-32 flex-shrink-0">
                                        <img src={course?.image} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-ml mb-2">
                                            {course?.title}
                                        </CardTitle>
                                        <p className="text-sm text-gray-600 mb-1">
                                            Created by <span className="font-bold">{course?.instructorName}</span>
                                        </p>
                                        <p className="text-gray-600 mb-2 text-[14px] mt-3">
                                            {
                                                `${course?.curriculum?.length} ${course?.curriculum.length == 1 ? 'Lecture' : 'Lectures'} - ${course?.level.toUpperCase()} Level`
                                            }
                                        </p>
                                        <p className="font-bold text-lg">
                                            ${course?.pricing}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )) : 
                        (loading ? <Skeleton /> : <h1>No Courses Found!</h1>)
                        
                    }
                </div>
            </main>
        </div>
    </div> );
}

export default StudentCourses;