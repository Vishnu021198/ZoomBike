import React from 'react'
import { useNavigate } from 'react-router-dom';

function UserOrderConfirmedComponent() {
    const navigate = useNavigate();
  return (
    <>
        <div className="flex mt-10 justify-center">
            <img
            src="https://www.smecrisistoolkit.eu/wp-content/uploads/2022/06/20.jpg"
            alt=""
            />
        </div>
        <div className="flex justify-center mb-10">
            <button onClick={() => navigate('/homepage')} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Return to Homepage</button>
        </div>
    </>
  )
}

export default UserOrderConfirmedComponent