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