import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from "flowbite-react";
import axios from 'axios';


function OwnerBookingComponent() {
    const [ownerDetails, setOwnerDetails] = useState(() => {
        const savedOwnerDetails = localStorage.getItem('ownerDetails');
        return savedOwnerDetails ? JSON.parse(savedOwnerDetails) : null;
    });
    const [bookings, setBookings] = useState([]);

    const user = useSelector((state) => state.user);
    const token = useSelector(state => state.user.token);

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

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const ownerId = ownerDetails.id;
                console.log(ownerId,"IDD")
                const response = await axios.get(`http://127.0.0.1:8000/api/owner/bookings/${ownerId}/`, {
                    headers: {
                        Authorization: `Bearer ${token.access}`,
                    },
                });
                setBookings(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [token.access]);

    const handleCancelBooking = async (bookingId) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/user/cancel-booking/', { booking_id: bookingId }, {
                headers: {
                    Authorization: `Bearer ${token.access}`
                }
            });
            
            const updatedBookings = bookings.map(booking => {
                if (booking.id === bookingId) {
                    return { ...booking, is_canceled: true };
                }
                return booking;
            });
            setBookings(updatedBookings);
        } catch (error) {
            console.error('Error cancelling booking:', error);
        }
    };
    
  return (
    <>
        {bookings.length === 0 ? (
          <div className="flex justify-center items-center flex-col mt-10">
            <p className="text-xl text-gray-600 mb-4">You Don't have any Bookings Yet</p>
          </div>
        ) : (
        <div className="flex flex-wrap justify-left mt-10 mb-10">
        {bookings.map((booking) => (
            <Card key={booking.id} className="max-w-sm mr-5" imgSrc={`http://127.0.0.1:8000/${booking.bike_details?.images}`}>
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
                    {booking.first_name} {booking.last_name}, {booking.phone_number}
                </p>
                {booking.is_canceled ? (
                    <p className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" >Cancelled</p>
                ) : (
                    <button onClick={() => handleCancelBooking(booking.id)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancel Booking</button>
                )}
            </Card>
          ))}
        </div>
        )}
    
    </>
  )
}

export default OwnerBookingComponent