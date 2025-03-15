import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {UserDataContext} from '../context/UserContext'
import axios from 'axios'


const UserProtecteWrapper = ({children}) => {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const {setUser} = useContext(UserDataContext)
  const [loading, setLoading] = useState(true)
  
   
  useEffect(() =>{
    if(!token){
        navigate('/user/login')
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response) =>{
        if(response.status === 200){
            const data = response.data
            setUser(data.user)
            setLoading(false)

        }
    }).catch(err =>{
        console.log(err)
        localStorage.removeItem('token')
        navigate('/user/login')
    })
  },[token])
  
  return (
    loading ? <>Loading ....</> : <>{children}</>
  )
}

export default UserProtecteWrapper