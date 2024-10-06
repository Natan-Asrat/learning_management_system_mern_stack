import React from 'react'
import { Outlet } from 'react-router-dom'
import StrudentViewCommonHeader from './header'

const StudentViewCommonLayout = () => {
  return (
    <div>
    
        <StrudentViewCommonHeader />
        <Outlet />
    </div>
  )
}

export default StudentViewCommonLayout