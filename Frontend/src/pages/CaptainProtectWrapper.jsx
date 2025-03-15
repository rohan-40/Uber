import React, { Children, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainProtectWrapper = ({children}) => {

  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const {setCaptain} = useContext(CaptainDataContext)

  const token = localStorage.getItem('token')

  useEffect(() =>{
    if(!token){
        navigate('/captain/login')
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response) =>{
        if(response.status === 200){
            const data = response.data
            setCaptain(data.captain)
            setLoading(false)

        }
    }).catch(err =>{
        console.log(err)
        localStorage.removeItem('token')
        navigate('/captain/login')
    })
  },[token])
  
  return (
    loading? <>Loading ...</> : <>{children}</>
  )
}

export default CaptainProtectWrapper