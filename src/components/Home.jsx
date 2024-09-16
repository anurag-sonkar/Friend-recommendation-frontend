import React from 'react'
import FriendList from './FriendList'
import SearchUsers from './SearchUsers'
import FriendRecommendations from './FriendRecommendations'

function Home() {

  return (
    <div className='bg-gray-200 h-[91.1vh] px-4 py-4 grid grid-cols-7 gap-4'>

      <div className='col-span-5 shadow-md rounded-md px-4 py-2 bg-white'><FriendList /></div>
      <div className='col-span-2 shadow-md rounded-md px-4 py-2 bg-white'><FriendRecommendations /></div>
    </div>
  )
}

export default Home