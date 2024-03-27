import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Card } from "flowbite-react";

function UserBookingComponent() {
  const [bookings, setBookings] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  const user = useSelector(state => state.user);
  const accessToken = useSelector(state => state.user.token.access);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/user-profile/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [accessToken]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/bookings/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching user bookings:', error);
      }
    };

    fetchUserBookings();
  }, [accessToken]);

  return (
    <>  
        <div>
        <img
        src="https://s3-ap-southeast-2.amazonaws.com/imotor-cms/images_cms/243992_2023%20kawasaki%20z1000%20-%20bannerimage%20-%20sws%20oct23.jpg"
        alt=""
        />
        </div>
        <div className="mt-5 flex justify-center">
            <h1 className="text-gray font-bold text-5xl">YOUR BOOKINGS</h1>
        </div>
        <div className="flex flex-wrap justify-left ml-32">
            {bookings.map(booking => (
            <Card key={booking.id} className="max-w-sm mt-10 mb-10 ml-5 mr-5" imgSrc={`http://127.0.0.1:8000/${booking.bike_details?.images}`}>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {booking.bike_details && `${booking.bike_details.brand.name} - ${booking.bike_details.model.name}`}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Pickup Date: {booking.pickup_date}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Drop Date: {booking.drop_date}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    City: {booking.city}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Amount Paid: {booking.amount_paid}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Owner: {booking.owner}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {booking.first_name} {booking.last_name}, {booking.phone_number}
                </p>
                <button href="#" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancel Booking</button>
            </Card>
            ))}
        </div>
    </>
  )
}

export default UserBookingComponent;
