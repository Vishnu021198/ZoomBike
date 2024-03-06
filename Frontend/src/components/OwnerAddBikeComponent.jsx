import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CITY_CHOICES = [
    ['Kasaragod', 'Kasaragod'],
    ['Kannur', 'Kannur'],
    ['Wayanad', 'Wayanad'],
    ['Kozhikode', 'Kozhikode'],
    ['Palakkad', 'Palakkad'],
    ['Thrissur', 'Thrissur'],
    ['Ernakulam', 'Ernakulam'],
    ['Idukki', 'Idukki'],
    ['Malappuram', 'Malappuram'],
    ['Kottayam', 'Kottayam'],
    ['Thiruvananthapuram', 'Thiruvananthapuram'],
    ['Kollam', 'Kollam'],
    ['Alappuzha', 'Alappuzha'],
    ['Pathanamthitta', 'Pathanamthitta'],
];

function OwnerAddBikeComponent() {
    
    const Token = useSelector(state => state.user.token);

console.log(Token.access,"TOKEN")
    const [bikeDetails, setBikeDetails] = useState({
        brand_id: '',
        model_id: '',
        registration_number: '',
        km_driven: '',
        year_of_registration: '',
        city: '',
        bike_rent: '',
        images: null,
    });

    const [bikeBrands, setBikeBrands] = useState([]);
    const [bikeModels, setBikeModels] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/bike/bike-brands/')
          .then(response => setBikeBrands(response.data))
          .catch(error => console.error('Error fetching bike brands:', error));
      }, []); 


    useEffect(() => {

        const fetchBikeBrands = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/bike/brands/');
                setBikeBrands(response.data);
            } catch (error) {
                console.error('Error fetching bike brands:', error);
            }
        };

        fetchBikeBrands();

    }, []);


    useEffect(() => {

        const fetchBikeModels = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/bike/models/');
                setBikeModels(response.data);
            } catch (error) {
                console.error('Error fetching bike brands:', error);
            }
        };

        fetchBikeModels();

    }, []);


    const handleBikeSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append('brand_id', bikeDetails.brand_id);
            formData.append('model_id', bikeDetails.model_id);
            formData.append('registration_number', bikeDetails.registration_number);
            formData.append('km_driven', bikeDetails.km_driven);
            formData.append('year_of_registration', bikeDetails.year_of_registration);
            formData.append('city', bikeDetails.city);
            formData.append('bike_rent', bikeDetails.bike_rent);
            formData.append('images', bikeDetails.images);
            
            const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
            const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
            
            formData.append('available_from', formattedStartDate);
            formData.append('available_to', formattedEndDate);
    
            const response = await axios.post('http://127.0.0.1:8000/api/bike/add_bike/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${Token.access}`,
                },
            });
    
            console.log(response.data);
        } catch (error) {
            console.error('Error adding bike:', error);
        }
    };
    

    const handleBrandChange = async (e) => {
        const selectedBrandId = e.target.value;
        setBikeDetails({
            ...bikeDetails,
            brand_id: selectedBrandId,
            model_id: '',
        });

        if (selectedBrandId) {
            try {
                const modelResponse = await axios.get(`http://127.0.0.1:8000/api/bike/models/${selectedBrandId}/`);
                setBikeModels(modelResponse.data);
            } catch (error) {
                console.error('Error fetching bike models:', error);
            }
        } else {
            setBikeModels([]);
        }
    };

    const handleInputChange = (e, field) => {
        setBikeDetails({
            ...bikeDetails,
            [field]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setBikeDetails({
            ...bikeDetails,
            images: e.target.files[0],
        });
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };
    
    


    return (
        <>
            <form className="mt-10 mb-10" onSubmit={handleBikeSubmit}>
                <h1 className="text-3xl font-bold text-black text-center mb-5">Add Bikes</h1>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="bikebrand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                            Bike Brand
                        </label>
                        <select
                            id="bikebrand"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleBrandChange}
                            value={bikeDetails.brand_id}
                        >
                            <option value="" disabled>
                                Choose a Brand
                            </option>
                            {bikeBrands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="bikemodel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                            Bike Model
                        </label>
                        <select
                            id="bikemodel"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => handleInputChange(e, 'model_id')}
                            value={bikeDetails.model_id}
                        >
                            <option value="" disabled>
                                Choose a Model
                            </option>
                            {bikeModels.map((model) => (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="registration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Registration Number</label>
                        <input 
                            type="text" 
                            id="registration" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="KL-XX-XXXX"
                            value={bikeDetails.registration_number} 
                            onChange={(e) => handleInputChange(e, 'registration_number')}
                        />
                    </div>
                    <div>
                        <label htmlFor="bikecity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                            City
                        </label>
                        <select
                            id="bikecity"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={bikeDetails.city}
                            onChange={(e) => handleInputChange(e, 'city')}
                        >
                            <option value="" disabled selected>
                                Choose a City
                            </option>
                            {CITY_CHOICES.map((city) => (
                                <option key={city[0]} value={city[0]}>
                                    {city[1]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="kmDriven" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">KM Driven</label>
                        <input 
                            type="number" 
                            id="kmDriven" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="123456" 
                            value={bikeDetails.km_driven} 
                            onChange={(e) => handleInputChange(e, 'km_driven')} 
                        />
                    </div>
                    <div>
                        <label htmlFor="yearRegistration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Year of Registration</label>
                        <input 
                            type="number" 
                            id="yearRegistration" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="2022"
                            value={bikeDetails.year_of_registration} 
                            onChange={(e) => handleInputChange(e, 'year_of_registration')}
                        />
                    </div>
                    <div>
                        <label htmlFor="bikeRent" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Bike Rent</label>
                        <input 
                            type="number" 
                            id="bikeRent" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="₹XX,XXX"
                            value={bikeDetails.bike_rent} 
                            onChange={(e) => handleInputChange(e, 'bike_rent')}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" htmlFor="file_input">
                            Upload Images
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="file_input"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div date-rangepicker className="flex items-center">
                        <div className="relative mt-2">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                >
                                <path
                                    d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                                />
                                </svg>
                            </div>
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                placeholderText="From Date"
                            />
                        </div>
                        <span className="mx-5 text-gray-500">to</span>
                        <div className="relative mt-2 ">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                >
                                <path
                                    d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                                />
                                </svg>
                            </div>
                            <DatePicker
                                selected={endDate}
                                onChange={handleEndDateChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                placeholderText="To Date"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    )
    
}

export default OwnerAddBikeComponent
