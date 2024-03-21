import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectToken, selectSelectedBike } from '../redux/Slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserBikeDetailComponent() {
    const dispatch = useDispatch();
    const [bike, setBike] = useState(null);
    const userToken = useSelector(selectToken);
    console.log("TOKENNNN",userToken)
    const selectedBike = useSelector(selectSelectedBike);
    console.log("Selected Bikeeeeee", selectedBike)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBikeDetails = async () => {
            try {
                setBike(selectedBike);
            } catch (error) {
                console.error('Error fetching bike details:', error);
            }
        };

        fetchBikeDetails();
    }, [selectedBike]);

    const handleBookNow = () => {
        if (userToken) {
            navigate('/userreviewbooking');
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            {bike && (
                <div>
                    <div className="grid grid-cols-2 gap-8 mt-20 mb-10 mx-10">
                        {/* First image */}
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src={`http://127.0.0.1:8000/${bike.images}`} alt="" />
                        </div>
                        {/* Container for second and third images */}
                        <div className="flex flex-col justify-start gap-4">
                            {/* Second image */}
                            <div>
                                <img className="h-auto rounded-lg" src={`http://127.0.0.1:8000/${bike.images}`} alt="" style={{ width: '250px', height: '250px' }} />
                            </div>
                            {/* Third image */}
                            <div>
                                <img className="h-auto mt-14 rounded-lg" src={`http://127.0.0.1:8000/${bike.images}`} alt="" style={{ width: '250px', height: '250px' }} />
                            </div>
                        </div>
                    </div>
                    <div className="mx-10 mb-10">
                        <h1 className="text-3xl font-bold">{bike.brand.name} - {bike.model.name}</h1>
                        <div className="flex items-center mt-4">
                        <button onClick={handleBookNow} className="bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 text-white">Book Now</button>
                            <span className="text-3xl font-bold ml-5">₹{bike.bike_rent}</span>
                        </div>
                        <div className="mt-8">
                            <h4 className="font-bold text-xl">Bike Details</h4>
                            <ul className="mt-2">
                                <li>Available City: {bike.city}</li>
                                <li>Year of Registration: {bike.year_of_registration}</li>
                                <li>KMs Driven: {bike.km_driven}</li>
                                <li>Name of the owner: {bike.owner_name}</li>
                                <li>Phone: {bike.owner_phone_number}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserBikeDetailComponent;
