import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import StrudentViewCommonHeader from './header'

const StudentViewCommonLayout = () => {
  const location = useLocation();
  return (
    <div>
      {
        !location.pathname.includes('/student-courses/') ?
        <StrudentViewCommonHeader /> : null
      }
       
        <Outlet />
    </div>
  )
}

export default StudentViewCommonLayout