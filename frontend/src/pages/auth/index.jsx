import {React, useContext, useState} from 'react'
import {Link}     from'react-router-dom';
import {GraduationCap} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CommonForm from '../../components/common-form';
import { signInFormControls, signUpFormControls } from '../../config';
import { AuthContext } from '../../context/auth-context';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
const AuthPage = () => {
  const {activeTab, setActiveTab, signInFormData, setSignInFormData, signUpFormData, setSignUpFormData, handleRegisterUser, handleLoginUser} = useContext(AuthContext)
    function handleTabChange(event, newValue) {
    setActiveTab(newValue);
  }
  function checkIfSignInFormIsValid() {
    return signInFormData && signInFormData.userEmail != '' &&signInFormData.password != '';
  }
  function checkIfSignUpFormIsValid() {
    return signUpFormData && signUpFormData.userName != '' && signUpFormData.userEmail != '' && signUpFormData.password != '' ;
  }
    return (
    <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex items-center border-b">
            <Link to={'/'} className="flex items-center justify-center">
                <GraduationCap className="h-8 w-8 mr-4">
                </GraduationCap>
                <span className="font-extrabold text-xl">LMS LEARN</span>

            </Link>
        </header>
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Tabs
            value={activeTab}
            defaultValue="signin"
            onValueChange={handleTabChange}
            className="w-full max-w-md"
            >
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value={'signin'}>
                    <Card className="p-6 space-y-4">
                        <CardHeader>
                            <CardTitle>
                                Sign in to your account
                            </CardTitle>
                            <CardDescription>
                                Enter your email and password to access your account
                            </CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                            <CommonForm 
                                formControls={signInFormControls}
                                buttonText={'Sign In'}
                                formData={signInFormData}
                                setFormData={setSignInFormData}
                                isButtonDisabled={
                                    !checkIfSignInFormIsValid()
                                }
                                handleSubmit={handleLoginUser}
                                /> 
                        </CardContent>
                    </Card>
                
                </TabsContent>
                <TabsContent value={'signup'}>
                <Card className="p-6 space-y-4">
                        <CardHeader>
                            <CardTitle>
                                Create a new account
                            </CardTitle>
                            <CardDescription>
                                Enter your details to get started
                            </CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                            <CommonForm 
                                formControls={signUpFormControls}
                                buttonText={'Sign Up'}
                                formData={signUpFormData}
                                setFormData={setSignUpFormData}
                                isButtonDisabled={
                                    !checkIfSignUpFormIsValid()
                                }
                                handleSubmit={handleRegisterUser}
                                />
                        </CardContent>
                    </Card>
                   

                </TabsContent>
            </Tabs>
        </div>
    </div>
  )
}

export default AuthPage