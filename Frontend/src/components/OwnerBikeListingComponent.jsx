import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setBike } from '../redux/Slices/userSlice';
import { useNavigate } from 'react-router-dom';

function OwnerBikeListingComponent() {
    const [bikes, setBikes] = useState([]);
    const [selectedBikeId, setSelectedBikeId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleDeleteBike = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/bike/delete_bike/${selectedBikeId}/`, {
                headers: {
                    Authorization: `Bearer ${token.access}`,
                },
            });
            setBikes(bikes.filter(bike => bike.id !== selectedBikeId));
            setSelectedBikeId(null);
            setShowModal(false);
        } catch (error) {
            console.error('Error deleting bike:', error);
        }
    };

    const handleEditBike = (bikeId) => {
        dispatch(setBike(bikeId));
        navigate('/ownereditbike');
    };

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
                        <a>
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{bike.brand.name} - {bike.model.name}</h5>
                        </a>
                        <h5 className="text-xs mt-2 font-semibold tracking-tight text-gray-900 dark:text-white">{bike.city}</h5>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl mr-10 font-bold text-gray-900 dark:text-white">₹{bike.bike_rent}</span>
                            <a onClick={() => handleEditBike(bike.id)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Edit</a>
                            <a onClick={() => {
                                    setShowModal(true);
                                    setSelectedBikeId(bike.id);
                                }} 
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</a>
                        </div>
                    </div>
                </div>
            </div>
            ))}
            </div>
            
            {showModal && (
            <div id="popup-modal" tabindex="-1" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Delete?</h3>
                            <button 
                            onClick={handleDeleteBike}
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

    </>
);
}

export default OwnerBikeListingComponent;