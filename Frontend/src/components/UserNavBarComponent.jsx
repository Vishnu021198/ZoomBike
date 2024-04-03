import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const UserNavBarComponent = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const Token = useSelector(state => state.user.token);
  const accessToken = Token.access;

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/user-navbar/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setUserName(response.data.name);
        setLoggedIn(true);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setLoggedIn(false);
      }
    };
  
    if (Token) {
      fetchUserName();
    }
  }, [accessToken]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('userName');
      localStorage.removeItem('userDetails');
      setUserName('');
      setLoggedIn(false);
      setDropdownOpen(false);
      navigate('/homepage');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  

  return (
    <>
    
      <nav className="fixed w-full z-20 top-0 start-0 border-b border-gray-200 bg-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" onClick={() => navigate('/homepage')} className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://yt3.googleusercontent.com/ytc/AIf8zZSJPFrHNAsABoBFZaXm4KOC5DIDuA2a8vZw9yuoQg=s900-c-k-c0x00ffffff-no-rj" className="h-8" alt="Flowbite Logo" />
            <span onClick={() => navigate('/homepage')} className="self-center text-2xl font-semibold whitespace-nowrap dark:text-dark">ZOOMBIKE</span>
          </a>
          <div className="flex md:order-2 space-x-3 bg-white md:space-x-0 rtl:space-x-reverse">
            <button onClick={() => navigate('/ownerlogin')} type="submit" className="mr-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Become a Host</button>
            {loggedIn ? (
              <div className="relative">
                <button onClick={toggleDropdown} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                  {`Hi, ${userName}`}
                </button>
                {dropdownOpen && (
                  <ul className="absolute top-full mt-1 bg-red-700 rounded-lg shadow-lg">
                    <li>
                      <button onClick={() => navigate('/userprofile')} className="block px-8 py-2 text-white hover:bg-red-800 font-medium rounded-lg text-sm w-full text-left">Profile</button>
                    </li>
                    <li>
                      <button onClick={() => navigate('/userbooking')} className="block px-8 py-2 text-white hover:bg-red-800 font-medium rounded-lg text-sm w-full text-left">Bookings</button>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="block px-8 py-2 text-white hover:bg-red-800 font-medium rounded-lg text-sm w-full text-left">Logout</button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <button onClick={() => navigate('/login')} type="submit" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Login/Register</button>
            )}
            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
            
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:border-gray-700">
              <li>
                <a href="#" onClick={() => navigate('/homepage')} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-dark dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-dark dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Company Profile</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-dark dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About Us</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNavBarComponent;
