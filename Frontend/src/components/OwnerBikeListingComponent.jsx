import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function OwnerBikeListingComponent() {
    const [bikes, setBikes] = useState([]);
    const token = useSelector(state => state.user.token);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/bike/bike_list/', {
                    headers: {
                        Authorization: `Bearer ${token.access}`,
                    },
                });
                setBikes(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [token.access]);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {bikes.map((bike) => (
            <div key={bike.id} className="flex mb-5">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-2 ml-2">
                    <a href="#">
                        <img className="p-8 rounded-t-lg" src={`http://127.0.0.1:8000/${bike.images}`} alt="product image" />
                    </a>
                    <div className="px-5 pb-5">
                        <a href="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{bike.brand.name} - {bike.model.name}</h5>
                        </a>
                        <h5 className="text-xs mt-2 font-semibold tracking-tight text-gray-900 dark:text-white">{bike.city}</h5>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{bike.bike_rent}</span>
                            <a href="#" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Edit</a>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </div>
    </>
);
}

export default OwnerBikeListingComponent;