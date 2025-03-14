import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})

  
    const submitHandler = (e) => {
      e.preventDefault();
      setUserData({
          fullname:{
              firstname,
              lastname
          },
          email,
          password,
      })
  
     console.log(userData)
      setFirstname('')
      setLastname('')
      setEmail('')
      setPassword('')
    };
  
    return (
      <div className="p-7 h-screen flex flex-col justify-between">
        <img
          className="w-16 mb-10 "
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt=""
        />
        <div>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h2 className="text-lg font-medium mb-2">What's our captain's name</h2>
            <div className="flex gap-3">
            <input
              required
              className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-2  w-full text-lg placeholder:text-base"
              type="text"
              placeholder="First name"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value)
              }}
            />
            <input
              required
              className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-2  w-full text-lg placeholder:text-base"
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value)
              }}
            />
            </div>
            <h2 className="text-lg font-medium mb-2">What's our captain's email</h2>
            <input
              required
              className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-2  w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <h2 className="text-lg font-medium mb-2">Enter password</h2>
            <input
              required
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2  w-full text-lg placeholder:text-base"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                  setPassword(e.target.value)
              }}
            />
           
            <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
              Create Account
            </button>
          </form>
          <p className="text-center">
          Already have a account?{" "}
            <Link to="/captain/login" className="text-blue-600">
             Login here
            </Link>
          </p>
        </div>
        <div className="mt-auto">
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
        Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
    );
}

export default CaptainSignup