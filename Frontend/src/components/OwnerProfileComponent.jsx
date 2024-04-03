import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

function OwnerProfileComponent() {
    const [ownerDetails, setOwnerDetails] = useState(() => {
        const savedOwnerDetails = localStorage.getItem('ownerDetails');
        return savedOwnerDetails ? JSON.parse(savedOwnerDetails) : null;
    });
    const [showModal, setShowModal] = useState(false);
    const [confirmUpdate, setConfirmUpdate] = useState(false);

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

    const updateOwnerProfile = async () => {
        try {
            const ownerId = ownerDetails.id; // Retrieve owner ID from ownerDetails
            const response = await axios.put(
                `http://127.0.0.1:8000/api/owner/owner-profile/update/${ownerId}/`,  // Append owner ID to the URL
                ownerDetails,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            console.log('Updated owner Details:', response.data);
            localStorage.setItem('ownerDetails', JSON.stringify(response.data)); 
            setOwnerDetails(response.data);
            setConfirmUpdate(false);
            setShowModal(false);
        } catch (error) {
            console.error('Error updating owner details:', error);
        }
    };
    
    
    
      useEffect(() => {
        if (confirmUpdate) {
          updateOwnerProfile();
        }
      }, [confirmUpdate]);

    

    

 

  return (
    <>

        <h1 className="text-3xl font-bold text-black text-center mb-5">Profile Details</h1>
        <div className="h-full">
            
        <div className="w-full md:w-3/5 p-8 bg-white lg:ml-56 shadow-md">
            <div className="rounded  shadow p-6">

                <div className="flex justify-between ">
                    <span className="text-xl font-semibold block">Your Profile</span>
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
                            onChange={(e) => setOwnerDetails({ ...ownerDetails, name: e.target.value })}
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
                        onChange={(e) => setOwnerDetails({ ...ownerDetails, email: e.target.value })}
                    />
                </div>
                <div className="pb-4">
                    <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">Phone Number</label>
                    <input
                        id="number"
                        className="border-1  rounded-r px-4 py-2 w-full"
                        type="text"
                        value={ownerDetails ? ownerDetails.phone_number : ''}
                        onChange={(e) => setOwnerDetails({ ...ownerDetails, phone_number: e.target.value })}
                    />
                </div>
                <div className="pb-4">
                    <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">Bike License Number</label>
                    <input
                        id="number"
                        className="border-1  rounded-r px-4 py-2 w-full"
                        type="text"
                        value={ownerDetails ? ownerDetails.bike_license_number : ''}
                        onChange={(e) => setOwnerDetails({ ...ownerDetails, bike_license_number: e.target.value })}
                    />
                </div>

                <button
                    onClick={() => {
                    setShowModal(true);
                    setConfirmUpdate(false);
                    }}
                    className="mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
                    type="button">
                    Save Changes
                </button>
                
                {showModal && (
                <div id="popup-modal" tabindex="-1" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Edit?</h3>
                                <button 
                                onClick={() => {
                                    setConfirmUpdate(true);
                                    setShowModal(false);
                                }}
                                data-modal-hide="popup-modal" 
                                type="button" 
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button onClick={() => setShowModal(false)} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>

        
        </div>
    </>
  )
}

export default OwnerProfileComponent