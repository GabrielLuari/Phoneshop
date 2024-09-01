import React from 'react'
import Register from '../components/Register'



function Auth({setUser,user}) {
  return (
    <div>
    <Register setUser={setUser} user={user} />
 
    </div>
  )
}

export default Auth
