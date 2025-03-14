import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtecteWrapper = ({children}) => {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  
   
  useEffect(()=>{
    if(!token){
      navigate('/user/login')
    }
  },[token])
  return (
    <>
        {children}
    </>
  )
}

export default UserProtecteWrapper