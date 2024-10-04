import { Children, createContext, useState } from "react";  
import { initialSignInFormData, initialSignUpFormData } from "../../config";
export const AuthContext = createContext(null);
import { registerService } from "../../services";
export default function AuthProvider({children}){
    const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
    async function handleRegisterUser(event){
        event.preventDefault()
        const data = await registerService(signUpFormData)
        console.log(data)
    }
    return <AuthContext.Provider value={{signInFormData, setSignInFormData, signUpFormData, setSignUpFormData, handleRegisterUser}}>{children}</AuthContext.Provider>
}