import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { Card } from 'flowbite-react';
import { selectToken, selectSelectedBike, selectUserId } from '../redux/Slices/userSlice';


function UserReviewBookingComponent() {
    const selectedBike = useSelector(selectSelectedBike);
    console.log("Selected Bikeeeeee", selectedBike)
    const userToken = useSelector(selectToken);
    console.log("TOKENNNN",userToken)
    const user = useSelector(selectUserId);
    console.log("Userrrrr", user)

    
    

    const [bike, setBike] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [taxAndServiceFee, setTaxAndServiceFee] = useState(0);
    const bikeId = selectedBike.id;
    const owner_name = selectedBike.owner_name
    




    useEffect(() => {
        const fetchBikeDetails = async () => {
            try {
                setBike(selectedBike);
                console.log("Bike detaileeeee", selectedBike)
            } catch (error) {
                console.error('Error fetching bike details:', error);
            }
        };

        fetchBikeDetails();
    }, [selectedBike]);

    useEffect(() => {
        if (startDate && endDate) {
            // Calculate number of days between start and end date
            const numberOfDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            
            // Calculate tax and service fee
            const taxAndServiceFeePerDay = 150;
            const calculatedTaxAndServiceFee = taxAndServiceFeePerDay * numberOfDays;
            setTaxAndServiceFee(calculatedTaxAndServiceFee);
    
            // Calculate total amount
            const basePrice = bike ? bike.bike_rent : 0;
            const totalAmount = basePrice * numberOfDays + calculatedTaxAndServiceFee;
            setTotalAmount(totalAmount);
        }
    }, [startDate, endDate, bike]);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleProceedToPayment = async () => {
        try {
            if (!bike) {
                console.error('Bike details not fetched yet.');
                return;
            }
            const firstName = document.getElementById('first_name').value;
            const lastName = document.getElementById('last_name').value;
            const phoneNumber = document.getElementById('phone').value;
            const aadharNumber = document.getElementById('company').value;
            
            
            // Format dates to "YYYY-MM-DD" format
            const formattedStartDate = startDate.toISOString().substr(0, 10);
            const formattedEndDate = endDate.toISOString().substr(0, 10);
    
            const availabilityResponse = await axios.get('http://127.0.0.1:8000/api/user/check-availability/', {
                params: {
                    start_date: formattedStartDate,
                    end_date: formattedEndDate,
                    bike_id: bikeId 
                }
            });
    
            if (availabilityResponse.data.length > 0) {
                const createBookingResponse = await axios.post('http://127.0.0.1:8000/api/user/create-booking/', {
                    user: user,
                    bike: bikeId,
                    pickup_date: formattedStartDate,
                    drop_date: formattedEndDate,
                    number_of_days: Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)),
                    city: bike.city,
                    amount_paid: totalAmount,
                    owner: owner_name,
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phoneNumber,
                    aadhar_number: aadharNumber,
                    is_paid: false,
                });
    
                console.log('Booking created:', createBookingResponse.data);
                // Handle success
            } else {
                alert('Selected dates are not available for booking. Please choose different dates.');
            }
        } catch (error) {
            console.error('Error checking availability or creating booking:', error);
            // Handle error
        }
    };
    
    

    return (
        <>
             <div className="flex flex-col items-center justify-center mt-10">
            <img src="https://s3-ap-southeast-2.amazonaws.com/imotor-cms/images_cms/243992_2023%20kawasaki%20z1000%20-%20bannerimage%20-%20sws%20oct23.jpg" alt="" />
            <div className="px-10 py-8 flex items-center justify-center">
                <h1 className=" text-left font-bold text-5xl mb-4">REVIEW BOOKING</h1>
            </div>
            {bike && (
                <div className="flex flex-col items-center justify-center mt-10 mb-10">
                    <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-4">
                        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={`http://127.0.0.1:8000/${bike.images}`} alt="" style={{ width: '300px', height: '250px' }} />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{bike.brand.name} - {bike.model.name}</h5>
                            <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">{bike.city}</p>
                            <p className="mb-3 text-xl font-bold text-gray-700 dark:text-white">₹{bike.bike_rent}</p>
                        </div>
                    </a>
                    <div className="flex justify-center">
                        <Card className="max-w-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Price Summary</h5>
                            </div>
                            <div className="flow-root">
                                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Base Price</p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">₹{bike.bike_rent}</div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Number of Days</p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{endDate && startDate ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) : 0}</div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Tax & Service Fee</p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">₹{taxAndServiceFee}</div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-lg font-medium text-gray-900 dark:text-white">Total Amount</p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-bold text-gray-900 dark:text-white">₹{totalAmount}</div>
                                        </div>
                                    </li>
                                    
                                    </ul>
                            </div>
                        </Card>
                    </div>
                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 w-full justify-center mt-4">
                        <div className="relative mt-2">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <div className="flex justify-center">
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleStartDateChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                    placeholderText="Pickup Date"
                                />
                            </div>
                        </div>
                        <span className="mx-5 text-gray-500">to</span>
                        <div className="relative mt-2">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <div className="flex justify-center">
                                <DatePicker
                                    selected={endDate}
                                    onChange={handleEndDateChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                    placeholderText="Drop Date"
                                />
                            </div>
                        </div>
                        </div>
                    <form className="grid gap-6 mb-6 md:grid-cols-4 mt-10">
                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">First name</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 ">Last name</label>
                            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone number</label>
                            <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="9876543210" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                        </div>
                        <div>
                            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Aadhar Number</label>
                            <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xxxx-xxxx-xxxx" required />
                        </div>  
                        </form>
                        <button
                            type="button"
                            onClick={handleProceedToPayment}
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                            Proceed to Payment
                        </button>
                </div>
            )}
        </div>
        </>
    )
}

export default UserReviewBookingComponent;