import React from 'react'
import FriendList from './FriendList'
import SearchUsers from './SearchUsers'
import FriendRecommendations from './FriendRecommendations'

function Home() {

  return (
    <div>
    <SearchUsers />
    <FriendList />
    <FriendRecommendations />
    </div>
  )
}

export default Home