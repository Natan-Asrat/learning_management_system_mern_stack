import React, {useContext} from 'react'
import {Routes, Route} from 'react-router-dom'
import AuthPage from './pages/auth'
import RouteGuard from './components/route-guard'
import { AuthContext } from './context/auth-context'
import InstructorDashboard from './pages/instructor'
import StudentViewCommonLayout from './components/student-view/common-layout'
import StudentHomePage from './pages/student/home'
import NotFoundPage from './pages/not-found'
import AddNewCoursePage from './pages/instructor/add-new-course'
const App = () => {
  const {auth} = useContext(AuthContext)
  return (
    <Routes>
      <Route path="/auth" 
      element={
        <RouteGuard
        element={<AuthPage/>}
        authenticated = {auth?.authenticate}
        user = {auth?.user}
        />
      }
      />
      <Route path="/instructor" 
      element={
        <RouteGuard
        element={<InstructorDashboard/>}
        authenticated = {auth?.authenticate}
        user = {auth?.user}
        />
      }
      />
      <Route path="/instructor/create-new-course" 
      element={
        <RouteGuard
        element={<AddNewCoursePage/>}
        authenticated = {auth?.authenticate}
        user = {auth?.user}
        />
      }
      />
      <Route path="/instructor/edit-course/:id" 
      element={
        <RouteGuard
        element={<AddNewCoursePage/>}
        authenticated = {auth?.authenticate}
        user = {auth?.user}
        />
      }
      />
      <Route path="/" 
      element={
        <RouteGuard
        element={<StudentViewCommonLayout/>}
        authenticated = {auth?.authenticate}
        user = {auth?.user}
        />
      }
      >
        <Route
          path="home"
          element={
            <StudentHomePage/>
          }
        >
          <Route
          path=""
          element={
            <StudentHomePage/>
          }
        ></Route>

        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  )
}

export default App