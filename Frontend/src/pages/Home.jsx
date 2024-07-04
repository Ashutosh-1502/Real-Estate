import React from 'react'
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector(state => state.user.currentUser);
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
