import React from 'react'
import FriendList from './FriendList'
import SearchUsers from './SearchUsers'
import FriendRecommendations from './FriendRecommendations'

function Home() {

  return (
    <div>
    <FriendList />
    <FriendRecommendations />
    </div>
  )
}

export default Home