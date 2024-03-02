import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export const AdminLoginComponent = () => {
    const navigate = useNavigate()
    const [formData,setFormData] =  useState({
        email:'',
        password:'',
    })
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData({...formData,[name]:value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()

    try{
        console.log('entered')
        const response = await axios.post('http://127.0.0.1:8000/api/admin/admin-login/',formData)
        console.log(response.data)
        navigate('/adminuserlist')
    }
    catch(error){
        console.error('failed login',error.response.data)

    }
    }
  return (
    <>
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src="https://yt3.googleusercontent.com/ytc/AIf8zZSJPFrHNAsABoBFZaXm4KOC5DIDuA2a8vZw9yuoQg=s900-c-k-c0x00ffffff-no-rj" alt="logo"/>
                ZoomBike    
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Admin Login
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" onChange={handleChange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        <button type="submit" className="w-full text-white text-bold bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Submit</button>


                    </form>
                </div>
            </div>
        </div>
    </section>  
    </>
  )
}
export default AdminLoginComponent;
