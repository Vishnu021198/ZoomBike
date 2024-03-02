import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserEmail } from '../redux/Slices/userSlice';
import { setToken } from '../redux/Slices/userSlice';
import axios from 'axios';






export const OwnerLoginComponent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/owner/login/', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        
      });
      dispatch(setUserEmail(email))


      const data = await response.json();

      if (response.ok) {
        console.log(data);
        console.log('success')
        dispatch(setToken(data.token));
        console.log(data.token,"TOKENNNN")
        navigate('/ownerprofile')
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:sp ace-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://yt3.googleusercontent.com/ytc/AIf8zZSJPFrHNAsABoBFZaXm4KOC5DIDuA2a8vZw9yuoQg=s900-c-k-c0x00ffffff-no-rj"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
      <div className="pb-5">
        <h1 className="text-3xl font-bold">Welcome Host!!</h1>
      </div>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
       <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <a
            className="text-red-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div className="text-center md:text-left">
        <button
            className="mt-4 bg-blue-600 text-bold hover:bg-white hover:text-blue-500 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
            onClick={handleLogin}

          >
            Login
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <a
            className="text-blue-600 hover:underline hover:underline-offset-4"
            href="#"
            onClick={() => navigate('/ownersignup')}
          >
            Register
          </a>
        </div>
      </div>
    </section>
    </>
  )
}
export default OwnerLoginComponent;
