import { Children, createContext, useState } from "react";  
import { initialSignInFormData, initialSignUpFormData } from "../../config";
export const AuthContext = createContext(null);
import { loginService, registerService } from "../../services";
export default function AuthProvider({children}){
    const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
    const [auth, setAuth] = useState({
        authenticate: false,
        user: null
    });
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
        }
    }
    return <AuthContext.Provider value={{signInFormData, setSignInFormData, signUpFormData, setSignUpFormData, handleRegisterUser, handleLoginUser}}>{children}</AuthContext.Provider>
}