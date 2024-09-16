import React from 'react'
import { useUserState } from '../Context/UserProvider'

function Header() {
    const {user} = useUserState()
    console.log(user)
  return (
      <h1 className="text-4xl font-bold text-center py-2">Welcome
      {
              user ? <span className='text-blue-600'> {user.username.split(" ")[0]} <span className='text-black'>to MERN Friend App!</span> </span> : "to MERN Friend App!"
      }
      
      </h1>
  )
}

export default Header