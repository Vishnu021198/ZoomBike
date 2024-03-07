import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function UserProfileComponent() {
  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem('userDetails');
    return savedUserDetails ? JSON.parse(savedUserDetails) : null;
});
    const user = useSelector((state) => state.user);
    const Token = useSelector(state => state.user.token);
    const accessToken = Token.access


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user/user-profile/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}` // Include access token in the Authorization header
                    }
                });
                console.log('User Details:', response.data);
                setUserDetails(response.data);
                localStorage.setItem('userDetails', JSON.stringify(response.data));

            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        

        
        fetchUserDetails();
        
    }, [user]);


  return (
    <div className="flex mt-32 justify-center items-center h-full">
      <div className="w-full md:w-3/5 p-8 bg-white shadow-md">
        <h1 className="text-3xl font-bold text-black text-center mb-5">Profile Details</h1>
        <div className="rounded shadow p-6">
          <div className="flex justify-between">
            <span className="text-xl font-semibold block">Your Profile</span>
            <a href="#" className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800">Edit</a>
          </div>
          <span className="text-gray-600">Feel Free to Edit Your Details!!</span>
          <div className="pb-6 mt-10">
            <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">Name</label>
            <div className="flex">
              <input
                id="username"
                className="border-1 rounded-r px-4 py-2 w-full"
                type="text"
                value={userDetails ? userDetails.name : ''}
              />
            </div>
          </div>
          <div className="pb-4">
            <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">Email</label>
            <input
              id="email"
              className="border-1 rounded-r px-4 py-2 w-full"
              type="email"
              value={userDetails ? userDetails.email : ''}
            />
          </div>
          <div className="pb-4">
            <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">Phone Number</label>
            <input
              id="number"
              className="border-1 rounded-r px-4 py-2 w-full"
              type="text"
              value={userDetails ? userDetails.phone_number : ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileComponent;
