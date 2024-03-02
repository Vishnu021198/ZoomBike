import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


function OwnerProfileComponent() {
    const [ownerDetails, setOwnerDetails] = useState(() => {
        // Load owner details from local storage if available
        const savedOwnerDetails = localStorage.getItem('ownerDetails');
        return savedOwnerDetails ? JSON.parse(savedOwnerDetails) : null;
    });
    const user = useSelector((state) => state.user); // accessing 'name' from the 'user' slice
    const Token = useSelector(state => state.user.token);
    const accessToken = Token.access
    
    
    useEffect(() => {
        const fetchOwnerDetails = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/owner/owner_profile/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}` // Include access token in the Authorization header
                    }
                });
                console.log('Owner Details:', response.data);
                setOwnerDetails(response.data);
                localStorage.setItem('ownerDetails', JSON.stringify(response.data));

            } catch (error) {
                console.error('Error fetching owner details:', error);
            }
        };
        

        
        fetchOwnerDetails();
        
    }, [user]);

    

    

 

  return (
    <>

        <h1 className="text-3xl font-bold text-black text-center mb-5">Profile Details</h1>
        <div className="h-full">
            
        <div className="w-full md:w-3/5 p-8 bg-white lg:ml-56 shadow-md">
            <div className="rounded  shadow p-6">
                <div className="flex justify-between ">
                    <span className="text-xl font-semibold block">Your Profile</span>
                    <a href="#" className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800">Edit</a>
                </div>
                <span className="text-gray-600">Feel Free to Edit Your Details!!</span>
                <div className="pb-6 mt-10">
                    <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">Name</label>
                    <div className="flex">
                        <input
                            id="username"
                            className="border-1  rounded-r px-4 py-2 w-full"
                            type="text"
                            value={ownerDetails ? ownerDetails.name : ''}
                        />
                    </div>
                </div>
                <div className="pb-4">
                    <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">Email</label>
                    <input
                        id="email"
                        className="border-1  rounded-r px-4 py-2 w-full"
                        type="email"
                        value={ownerDetails ? ownerDetails.email : ''}
                    />
                </div>
                <div className="pb-4">
                    <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">Phone Number</label>
                    <input
                        id="number"
                        className="border-1  rounded-r px-4 py-2 w-full"
                        type="text"
                        value={ownerDetails ? ownerDetails.phone_number : ''}
                    />
                </div>
                <div className="pb-4">
                    <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">Bike License Number</label>
                    <input
                        id="number"
                        className="border-1  rounded-r px-4 py-2 w-full"
                        type="text"
                        value={ownerDetails ? ownerDetails.bike_license_number : ''}
                    />
                </div>
            </div>
        </div>

        
        </div>
    </>
  )
}

export default OwnerProfileComponent