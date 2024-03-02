import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/Slices/userSlice';

function OwnerSidebarComponent() {

    const navigate = useNavigate()
    const dispatch = useDispatch();


    const [ownerDetails, setOwnerDetails] = useState(() => {
        // Load owner details from local storage if available
        const savedOwnerDetails = localStorage.getItem('ownerDetails');
        return savedOwnerDetails ? JSON.parse(savedOwnerDetails) : null;
    });
    const user = useSelector((state) => state.user); 
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

    const handleLogout = () => {
        localStorage.removeItem('ownerDetails');
        dispatch(clearUser()); 
        navigate('/ownerlogin');
    };

  return (
    <>
        <div class="w-3/12 bg-white rounded p-3 shadow-lg">
              <div class="flex items-center space-x-4 p-2 mb-5">
                  <img class="h-12 rounded-full" src="https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg?w=1480" alt="James Bhatta"/>
                  <div>
                      <h4 class="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">{ownerDetails ? ownerDetails.name : ''}</h4>
                      <span class="text-sm tracking-wide flex items-center space-x-1">
                          <svg class="h-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg><span class="text-gray-600">Verified</span>
                      </span>
                  </div>
              </div>
              <ul class="space-y-2 text-sm">
                  
                  
                  
                  <li>
                      <a href="#" onClick={() => navigate('/ownerprofile')} class="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                          <span class="text-gray-600">
                              <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                          </span>
                          <span>My Profile</span>
                      </a>
                  </li>
                  <li>
                      <a href="#" class="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                          <span class="text-gray-600">
                              <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                          </span>
                          <span>Dashboard</span>
                      </a>
                  </li>
                  <li>
                      <a href="#" onClick={() => navigate('/ownerbikelist')} class="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                          <span class="text-gray-600">
                              <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                          </span>
                          <span>Bike Details</span>
                      </a>
                  </li>
                  <li>
                      <a href="" class="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                          <span class=" text-gray-600">
                              <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                          </span>
                          <span>Bookings</span>
                      </a>
                  </li>
                  <li>
                      <a href="#" class="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                          <span class="text-gray-600">
                              <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                              </svg>
                          </span>
                          <span>Chats</span>
                      </a>
                  </li>
                  <li>
                      <a href="#" onClick={handleLogout} class="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                          <span class="text-gray-600">
                              <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                          </span>
                          <span>Logout</span>
                      </a>
                  </li>
              </ul>
          </div>
    
    </>
  )
}

export default OwnerSidebarComponent