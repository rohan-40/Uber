import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle:{
        color,
        plate,
        capacity,
        vehicleType
      }
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/register`,
      newCaptain
    );

    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain/home");
    }
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setColor("");
    setCapacity("");
    setPlate("");
    setVehicleType("");
  };

  return (
    <div className="px-7 pt-7  h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-6 "
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt=""
        />
        <form onSubmit={submitHandler}>
          <h2 className="text-lg font-medium mb-2">
            What's our captain's name
          </h2>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2  text-lg placeholder:text-base"
              type="text"
              placeholder="First name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2  text-lg placeholder:text-base"
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <h2 className="text-lg font-medium mb-2">
            What's our captain's email
          </h2>
          <input
            required
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2  w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h2 className="text-lg font-medium mb-2">Enter password</h2>
          <input
            required
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2  w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h2 className="text-lg font-medium mb-2">Vehicle information</h2>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2  text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2  text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Plate"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
            />
          </div>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2  text-lg placeholder:text-base"
              type="number"
              placeholder="Vehicle Capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
            <select
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-3 py-2  text-lg placeholder:text-base"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>
          </div>
          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/captain/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div className="mt-7 px-4 py-7">
        <p className="text-[10px] leading-tight ">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
