import { Children, createContext, useEffect, useState } from "react";  
import { initialSignInFormData, initialSignUpFormData } from "../../config";
export const AuthContext = createContext(null);
import { checkAuthService, loginService, registerService } from "../../services";
import { Skeleton } from "@/components/ui/skeleton"

export default function AuthProvider({children}){
    const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
    const [auth, setAuth] = useState({
        authenticate: false,
        user: null
    });
    const [loading, setLoading] = useState(true)
    async function handleRegisterUser(event){
        event.preventDefault()
        const data = await registerService(signUpFormData)
        console.log(data)
    }
    async function handleLoginUser(event){
        event.preventDefault();
        const data = await loginService(signInFormData);
        if(data.success){
            sessionStorage.setItem("accessToken", JSON.stringify(data.data.accessToken));
            setAuth({
                authenticate: true,
                user: data.data.user
            })
            setLoading(false)
        }else{
            setAuth({
                authenticate: false,
                user: null
            })
            setLoading(false)
        }
    }
    async function checkAuth(){
        try{
            const data = await checkAuthService();
            if(data.success){
                setAuth({
                    authenticate: true,
                    user: data.data.user
                })
                setLoading(false)
            }else{
                setAuth({
                    authenticate: false,
                    user: null
                })
                setLoading(false)
            
        }
        }catch(error){
            console.log(error)
            if(!error?.response?.data?.success){
                setAuth({
                    authenticate: false,
                    user: null
                })
                setLoading(false)
            }
        }
        
}
    useEffect(() => {checkAuth();}, [])
    return <AuthContext.Provider value={{signInFormData, setSignInFormData, signUpFormData, setSignUpFormData, handleRegisterUser, handleLoginUser, auth}}>
        {loading? <Skeleton /> : children}
        </AuthContext.Provider>
}