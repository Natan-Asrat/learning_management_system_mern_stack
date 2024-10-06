import axiosInstance from "@/api/axiosInstance";
import { progress } from "framer-motion";

export async function registerService(formData){
    const {data} = await axiosInstance.post('/auth/register', {
        ...formData,
        role: 'user'
    })
    return data;
    
}


export async function loginService(formData){
    const {data} = await axiosInstance.post('/auth/login', formData)
    return data;
    
}

export async function checkAuthService(){
    const {data} = await axiosInstance.get('/auth/check-auth')
    return data;
    
}

export async function mediaUploadService(formData, onProgressCallback){
    const {data} = await axiosInstance.post('/media/upload', formData, {
        onUploadProgress: (progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); 
            onProgressCallback(percentCompleted);
        })
    })
    return data;
    
}
export async function mediaBulkUploadService(formData, onProgressCallback){
    const {data} = await axiosInstance.post('/media/bulk-upload', formData, {
        onUploadProgress: (progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); 
            onProgressCallback(percentCompleted);
        })
    })
    return data;
    
}
export async function mediaDeleteService(id){
    const {data} = await axiosInstance.delete('/media/delete/'+id)
    return data;
    
}

export async function fetchInstructorCourseListService(){
    const {data} = await axiosInstance.get('/instructor/course/get')
    return data
}
export async function addNewCourseService(formData){
    const {data} = await axiosInstance.post('/instructor/course/add', formData);
    return data;
}

export async function fetchInstructorCourseDetailsService(id){
    const {data} = await axiosInstance.get('/instructor/course/details/'+id)
    return data;
}
export async function updateCourseService(id, formData){
    const {data} = await axiosInstance.put('/instructor/course/update/' + id, formData);
    return data;
}