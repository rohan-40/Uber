import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'
import UserProtecteWrapper from './pages/UserProtecteWrapper'
import UserLogout from './pages/UserLogout'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Start /> } />
        <Route path='/user/login' element = { <UserLogin />} />
        <Route path='/user/signup' element = { <UserSignup />} />
        <Route path='/captain/login' element = { <CaptainLogin />} />
        <Route path='/captain/signup' element = { <CaptainSignup />} />
        <Route path='/home' element={ 
          <UserProtecteWrapper>
              <Home/>
          </UserProtecteWrapper>
        } />
        <Route path='/user/logout' element= {
          <UserProtecteWrapper>
              <UserLogout />
          </UserProtecteWrapper>
        }/>

      </Routes>
    </div>
  )
}

export default App
