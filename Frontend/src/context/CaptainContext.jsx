import React, { createContext, useState } from 'react'

export const CaptainDataContext = createContext();

const CaptainContext = ({children}) => {
    
    const [captain, setCaptain] = useState(null)
    const [isloading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)

    const updateCaptain = (captainData) =>{
        setCaptain(captainData)
    }

    const value = {
        captain,
        setCaptain,
        isloading,
        setLoading,
        errors,
        setErrors,
        updateCaptain
    }
  return (
    
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    
  )
}

export default CaptainContext
