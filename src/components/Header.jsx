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
      <h1 className="text-4xl font-bold table mx-auto py-2">Welcome
        {
          user ? <span className='text-blue-600'> {user.username.split(" ")[0]} <span className='text-black'>to MERN Friend App!</span> </span> : " to MERN Friend App!"
        }

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