import React from 'react'
import { Outlet } from 'react-router-dom'

const StudentViewCommonLayout = () => {
  return (
    <div>StudentViewCommonLayout
        <Outlet />
    </div>
  )
}

export default StudentViewCommonLayout