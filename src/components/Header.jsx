import React from 'react'
import { useUserState } from '../Context/UserProvider'
import Slider from './Slider'
import Notification from './Notification'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

function Header() {
  const { user, setUser } = useUserState()
  const navigate = useNavigate()
  // console.log(user)
  const handleLogout = () => {
    localStorage.removeItem('user-info')
    setUser(null)
    navigate('/login')

  }
  return (
    <nav className='flex items-center justify-between bg-blue-100 px-4'>
      {
        user !== null && <Slider />
      }
      <h1 className="lg:text-4xl text-2xl font-bold table mx-auto py-4">
        {user ? (
          <>
            Hi! <span className="text-blue-600">{user.username.split(" ")[0]}</span>
          </>
        ) : (
          <>
              <div className='text-[1.4rem]'>Welcome to MERN Friend App!</div>
          </>
        )}
      </h1>

      {
        user !== null && <div className='flex items-center gap-4 justify-center'>
          <Notification />
          <Button danger onClick={handleLogout}>Logout</Button>
        </div>
      }
    </nav>
  )
}

export default Header