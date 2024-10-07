import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import {Button} from '@/components/ui/button'

function StrudentViewCommonHeader() {
    const {resetCredentials} = useContext(AuthContext)
    const navigate = useNavigate();
    function handleLogout() {
        resetCredentials()
        sessionStorage.clear()
    
      }
    return ( 
        <header className="flex items-center justify-between border-b p-4 relative">
            <div className="flex items-center space-x-4">
                <Link to="/home" className="flex items-center hover:text-black" >
                    <GraduationCap 
                    className="h-8 w-8 mr-4"
                    />
                    <span className="font-extrabold md:text-xl text-[14px]">
                        LMS LEARN
                    </span>
                </Link>
                <div className="flex items-center space-x-1">
                    <Button 
                    onClick={() => location.pathname.includes('/courses') ? null : navigate('/courses')}
                    variant="ghost" 
                    className="font-medium text-[14px] md:text-[16px]"
                    > Explore Courses</Button>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex gap-4 items-center">
                    <div 
                    onClick={()=> navigate('/student-courses')}
                    className="cursor-pointer flex items-center gap-3">
                    <span className="font-extrabold md:text-xl text-[14px]">
                        My Courses
                    </span>
                    <TvMinimalPlay className="w-8 h-8 cursor-pointer" />

                    </div>
                    <Button
                    onClick={() => {handleLogout}}
                    >Sign Out</Button>
                </div>
            </div>
        </header>

     );
}

export default StrudentViewCommonHeader;