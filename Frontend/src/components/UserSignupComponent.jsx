import React from "react";
import { useForm } from "react-hook-form";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { setUserEmail,setUserName } from '../redux/Slices/userSlice';
import { useDispatch } from 'react-redux';



const fields = [
  { label: 'Name', name: 'name', type: 'text', required: true, gridCols: 2, placeholder: 'Enter your name' },
  { label: 'Email', name: 'email', type: 'email', required: true, gridCols: 2, placeholder: 'Enter your email' },
  { label: 'Phone Number', name: 'phone_number', type: 'tel', required: true, gridCols: 2, placeholder: 'Enter your phone number' },
  { label: 'Password', name: 'password', type: 'password', required: true, gridCols: 1, placeholder: 'Enter your password' },
  { label: 'Confirm Password', name: 'password2', type: 'password', required: true, gridCols: 1, placeholder: 'Confirm your password' },
];


export default function UserSignupComponent () {
  const dispatch=useDispatch()
    const navigate = useNavigate()
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
    } = useForm();

    const [formData, setFormData] = useState(new FormData());

    const onSubmit = async (data) => {
      try {
        const formData = new FormData();
        console.log(data);
  
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone_number", data.phone_number);
        formData.append("password", data.password);
        formData.append("password2", data.password2);

  
        console.log(formData, "formdata");
  
        const response = await axios.post(
          "http://localhost:8000/api/user/register/",
          formData,
        );
  
        console.log(response.data);
        localStorage.setItem("registeredEmail", data.email);

        navigate("/verifyOTP");
      } catch (error) {
        console.error(
          "Registration failed:",
          error.response?.data || error.message
        );
      }
    };

    const registerUserWithGoogle = async (googleData) => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/user/register-google/",
          {
            google_oauth: googleData,
          }
        );
    
        console.log(response.data);
        if (response.data.msg === "Registration successful") {
  
        dispatch(setUserName(googleData.given_name));
        dispatch(setUserEmail(googleData.email));
          navigate("/homepage");
        }
  
        // Handle the response, redirect, etc.
      } catch (error) {
        console.error("Error during registration:", error);
      }
    };
  
  return (
    <div>
      <div className="container mx-auto mt-48">
        <div className="lg:w-7/12 pb-10 pt-5 w-full p-4 flex flex-wrap justify-center shadow-2xl my-20 rounded-md mx-auto">
          <div className="pb-5">
            <h1 className="text-3xl font-bold">User Registeration</h1>
          </div>
          
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-start items-center w-full m-auto"
          >
            <div className="grid grid-cols-1 mb-6 md:grid-cols-2 gap-3 w-full">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className={`text-left flex flex-col gap-2 w-full ${
                    field.gridCols === 2 ? "md:col-span-2" : ""
                  }`}
                >
                  <label className="font-semibold">{field.label}</label>
                  <input
                    {...register(field.name, {
                      required: field.required,
                    })}
                    className={`border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500 ${
                      field.gridCols === 2 ? "md:w-full" : ""
                    }`}
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                  {errors[field.name] && (
                    <span>This field is required</span>
                  )}
                </div>
              ))}
            </div>


            <div className="w-full text-left">
              <button
                type="submit"
                className="flex justify-center text-bold items-center gap-2 w-full py-3 px-4 bg-red-500 text-white text-md font-bold border border-red-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-red-500 lg:m-0 md:px-6"
                title="Confirm Order"
              >
                <span>Register</span>
                <HiOutlineArrowCircleRight size={20} />
              </button>
            </div>
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
                Or
              </p>
            </div>
            <GoogleOAuthProvider clientId="1004631712727-no8egf03n7p2ql1lpldck96a24a2vkri.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  console.log(decoded);
                  registerUserWithGoogle(decoded)
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
            <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                Already have an account?{" "}
                <a
                    className="text-blue-600 hover:underline hover:underline-offset-4"
                    onClick={() => navigate('/login')}

                    href="#"
                >
                    Login
                </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}



























