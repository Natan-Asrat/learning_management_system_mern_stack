import axiosInstance from "@/api/axiosInstance";

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

export async function fetchStudentCourseListService(query){
    const {data} = await axiosInstance.get(`/student/course/get?${query}`)
    return data
}

export async function fetchStudentCourseDetailsService(id){
    const {data} = await axiosInstance.get('/student/course/details/'+id)
    return data;
}

export async function createPaymentService(formData){
    const {data} = await axiosInstance.post("/student/order/create", formData)
    return data;
}

export async function capturePaymentService(paymentId, payerId, orderId){
    const {data} = await axiosInstance.post("/student/order/capture", {paymentId, payerId, orderId})
    return data;
}

export async function getBoughtCourses(studentId){
    const {data} = await axiosInstance.get('/student/bought/get/'+ studentId);
    return data;
}

export async function checkCoursePurchasedInfoService(courseId, studentId){
    const {data} = await axiosInstance.get('/student/course/purchase_info/'+ studentId +'/'+ courseId);
    return data;
}


export async function getCurrentCourseProgressService(userId, courseId ){
    const {data} = await axiosInstance.get('/student/progress/course-progress/'+ userId +'/'+ courseId);
    return data;
}

export async function markLectureAsViewedService( userId, courseId, lectureId){
    const {data} = await axiosInstance.post("/student/progress/lecture-viewed", {userId, courseId, lectureId})
    return data;
}

export async function resetCourseProgressService(userId, courseId){
    const {data} = await axiosInstance.post("/student/progress/reset-progress", {userId, courseId})
    return data;
}