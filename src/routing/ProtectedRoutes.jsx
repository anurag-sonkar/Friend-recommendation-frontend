import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserState } from '../Context/UserProvider'

function ProtectedRoutes({children}) {
  const {user} = useUserState()
    
  return (
    user !== null ? children : <Navigate to="/login" replace={true}/>
  )
}

export default ProtectedRoutes