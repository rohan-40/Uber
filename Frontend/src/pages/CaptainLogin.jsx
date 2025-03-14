import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({})

  const submitHandler = (e) =>{
    e.preventDefault();
    setCaptainData({
      email:email,
      password: password
    })
    console.log(captainData)
    setEmail('')
    setPassword('')
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <img
        className="w-16 mb-10 "
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt=""
      />
      <div>
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h2 className="text-lg font-medium mb-2">What's your email</h2>
          <input
            required
            value ={email}
            onChange={(e) =>{
              setEmail((e.target.value))
            }}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
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
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
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
