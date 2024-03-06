import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectFilteredBikes } from '../redux/Slices/userSlice';
import { Toast } from 'flowbite-react';
import { HiExclamation} from 'react-icons/hi';
import { Link } from 'react-router-dom'; 

function UserBikeListingComponent() {
  const [bikes, setBikes] = useState([]);
  const filteredBikes = useSelector(selectFilteredBikes);

  useEffect(() => {
    if (filteredBikes.length > 0) {
      // If there are filtered bikes available, set them
      setBikes(filteredBikes);
    } else {
      // If no filtered bikes are available, fetch all bikes
      const fetchBikes = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/user/bike-list/');
          setBikes(response.data);
        } catch (error) {
          console.error('Error fetching bikes:', error);
        }
      };

      fetchBikes();
    }
  }, [filteredBikes]);

  return (
    <>
    <img
        src="https://s3-ap-southeast-2.amazonaws.com/imotor-cms/images_cms/243992_2023%20kawasaki%20z1000%20-%20bannerimage%20-%20sws%20oct23.jpg"
        alt=""
    />
    
    <h2 className="text-dark  text-center font-semibold text-5xl mb-8 mt-5">Pick Your Ride!</h2>
    {filteredBikes.length === 0 && (
      <div className="mb-5 ml-20">
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
          <HiExclamation className="h-5 w-5" />
        </div>
        <div className="ml-5 text-sm font-normal">No Bikes Available in selected Location.</div>
        <Toast.Toggle />
      </Toast>
      </div>
    )}

      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10 ml-20">
      
        {bikes.map((bike) => (
            <div key={bike.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-2 ml-2">
            <Link to={`/userbikedetail/${bike.id}`}>
            <a href="#">
                <img className="p-8 rounded-t-lg" src={`http://127.0.0.1:8000/${bike.images}`} alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{bike.brand.name} - {bike.model.name}</h5>
                </a>
                <h5 className="text-xs mt-2 font-semibold tracking-tight text-gray-900 dark:text-white">{bike.city}</h5>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">₹ {bike.bike_rent}</span>
                    <a href="#" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Book Now</a>
                </div>
            </div>
            </Link>
            </div>
             ))} 
        </div>        
    

    </>
  )
}

export default UserBikeListingComponent