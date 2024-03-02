import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { setUserEmail, setToken, setUserName } from '../redux/Slices/userSlice';
import axios from 'axios';


export const UserLoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log(data);
        console.log('success');
        dispatch(setToken(data.token));
        console.log(data.token,"TOKENNNN")
        navigate('/homepage');
        // You may want to store the token in localStorage or a state management library
      } else {
        // Login failed
        console.error(data);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  const loginWithGoogle = async (googleData) => {
    try {
      console.log(googleData, "DATA");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/google-login/",
        {
          google_oauth: googleData,
        }
      );

      console.log(response.data);
      if (response.data.msg === "Login Success") {
        const { token, user_name, email } = response.data;
        console.log(response.data,"responsedata")
    
        dispatch(setUserName(googleData.given_name));
        dispatch(setUserEmail(email));
        navigate("/homepage");
      }

    } catch (error) {
      console.error("Error during login:", error);
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
        <h1 className="text-3xl font-bold">Welcome back Rider!!</h1>
      </div>
        <GoogleOAuthProvider clientId="1004631712727-no8egf03n7p2ql1lpldck96a24a2vkri.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);
              console.log(decoded);
              loginWithGoogle(decoded)
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Or
          </p>
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
          {/* <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label> */}
          <a
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
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
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="#"
            onClick={() => navigate('/signup')}
          >
            Register
          </a>
        </div>
      </div>
    </section>
    </>
  )
}
export default UserLoginComponent;