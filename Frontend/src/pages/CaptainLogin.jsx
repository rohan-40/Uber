import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const {setCaptain} = useContext(CaptainDataContext);

  const submitHandler = async (e) =>{
    e.preventDefault();
    const captain = {
      email:email,
      password: password
    }

    const response  = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`,captain)

    if(response.status === 200){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate('/captain/home')
    }

    setEmail('')
    setPassword('')
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <img
        className="w-16 mb-6 "
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt=""
      />
      <div>
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h2 className="text-lg font-medium mb-2">What's our captain's email</h2>
          <input
            required
            value ={email}
            onChange={(e) =>{
              setEmail((e.target.value))
            }}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2  w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h2 className="text-lg font-medium mb-2">Enter password</h2>
          <input
            required
            value ={password}
            onChange={(e) =>{
              setPassword((e.target.value))
            }}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2  w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          Join as a fleet?{" "}
          <Link to="/captain/signup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
        
      </div>
      <div className="mt-auto">
          <Link
            to="/user/login"
            className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-2 rounded-lg px-4 py-2 mt- w-full text-lg placeholder:text-base"
          >
            Sign in as User
          </Link>
        </div>
    </div>
  )
}

export default CaptainLogin
