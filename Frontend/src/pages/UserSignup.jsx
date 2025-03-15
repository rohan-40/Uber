import axios from "axios";
import React, { useState ,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {UserDataContext} from '../context/UserContext'

const UserSignup = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {user , setUser} = useContext(UserDataContext)

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,newUser)
    console.log(response.status)
    if(response.status === 200){
      const data = response.data;
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <img
        className="w-16 mb-6 "
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt=""
      />
      <div>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h2 className="text-lg font-medium mb-2">What's your name</h2>
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
          <h2 className="text-lg font-medium mb-2">What's your email</h2>
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
            autoComplete="new-password"  // ✅ Add this line

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
          <Link to="/user/login" className="text-blue-600">
           Login here
          </Link>
        </p>
      </div>
      <div className="mt-auto px-4">
      <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
      Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  );
};

export default UserSignup;
