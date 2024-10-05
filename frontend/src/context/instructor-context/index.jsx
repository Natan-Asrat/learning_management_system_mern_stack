import { createContext, useState } from "react";
import { courseLandingInitialFormData } from "../../config";

export const InstructorContext = createContext(null);

export default function InstructorProvider({children}){
    const [courseLandingFormData , setCourseLandingFormData] = useState(courseLandingInitialFormData);
    
    return <InstructorContext.Provider value={{
        courseLandingFormData , setCourseLandingFormData
    }}>{children}</InstructorContext.Provider>
}