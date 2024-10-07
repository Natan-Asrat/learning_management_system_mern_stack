import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://learning-management-system-mern-stack.vercel.app/"
});

axiosInstance.interceptors.request.use(config=>{
    const token = JSON.parse(sessionStorage.getItem('accessToken')) || "";
    if(token){
        config.headers.Authorization = `Bearer ${token}`;

    }
    return config;
}, error => Promise.reject(error))

export default axiosInstance;