import React from 'react'
import { useUserState } from '../Context/UserProvider'
import Slider from './Slider'
import Notification from './Notification'

function Header() {
    const {user} = useUserState()
    console.log(user)
  return (
      <nav className='flex items-center justify-between bg-blue-100 px-4'>
      <Slider />
          <h1 className="text-4xl font-bold text-center py-2">Welcome
              {
                  user ? <span className='text-blue-600'> {user.username.split(" ")[0]} <span className='text-black'>to MERN Friend App!</span> </span> : "to MERN Friend App!"
              }

          </h1>
        <Notification />
      </nav>
  )
}

export default Header