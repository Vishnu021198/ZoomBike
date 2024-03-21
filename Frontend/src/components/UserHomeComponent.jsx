import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { setFilteredBikes, setBike } from '../redux/Slices/userSlice';
import { useDispatch } from 'react-redux';


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

function UserHomeComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bikes, setBikes] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [cityChoices, setCityChoices] = useState([]);

  

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/home/');
        setBikes(response.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching bikes:', error);
      }
    };

    fetchBikes();
  }, []);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };
  
  const morebikes = () => {
    navigate('/userbikelist')
  };


  const handleSearch = async () => {
    try {
      let params = {};
      if (selectedCity) {
        params.city = selectedCity;
      }
      if (startDate) {
        params.start_date = startDate.toISOString().split('T')[0];
      }
      if (endDate) {
        params.end_date = endDate.toISOString().split('T')[0];
      }
  
      // Print selected city, start date, and end date before sending to the backend
      console.log("Selected City:", selectedCity);
      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);
  
      // Only send request if at least one of city, start date, or end date is available
      if (Object.keys(params).length > 0) {
        const response = await axios.get('http://127.0.0.1:8000/api/user/bike-list/', { params });
        const filteredBikes = response.data;
        setBikes(filteredBikes);
        dispatch(setFilteredBikes(filteredBikes));
        navigate('/userbikelist');
      }
    } catch (error) {
      console.error('Error fetching bikes:', error);
    }
  };

  const handleBikeClick = (selectedBike) => {
    dispatch(setBike(selectedBike));
    console.log('Selected Bike:', selectedBike);
    navigate('/userbikedetail') 
  };
  


  return (
    <>
      <img
        src="https://s3-ap-southeast-2.amazonaws.com/imotor-cms/images_cms/243992_2023%20kawasaki%20z1000%20-%20bannerimage%20-%20sws%20oct23.jpg"
        alt=""
      />
      <div className="absolute inset-0 px-10 py-40 flex items-start justify-left">
        <div>
          <h1 className="text-white  text-left font-bold text-5xl mb-4">TAKE A JOY RIDE</h1>
          <h2 className="text-white  text-left font-semibold mb-10">BOOK YOUR RIDE TODAY!!</h2>
          <label htmlFor="default-search" className="mb text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative mt-2">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            </div>
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            >
              <option value="" disabled defaultValue>
                Choose a City
              </option>
              {CITY_CHOICES.map((city) => (
                <option key={city[0]} value={city[0]}>
                  {city[1]}
                </option>
              ))}
            </select>
            
            <button
              type="submit"
              onClick={handleSearch}
              className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Search
            </button>
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
                placeholderText="Pickup Date"
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
                placeholderText="Drop Date"
              />
            </div>
          </div>
        </div>
        
      </div>

      <h2 className="text-dark  text-center font-semibold text-5xl mb-8 mt-5">Pick Your Ride!</h2>

      <div className="flex flex-wrap justify-center">
        
        {bikes.map((bike) => (
          <a href="#" onClick={() => handleBikeClick(bike)}>
            <div key={bike.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-2 ml-10">
            <a>
                <img className="p-8 rounded-t-lg" src={`http://127.0.0.1:8000/${bike.images}`} alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <a>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{bike.brand.name} - {bike.model.name}</h5>
                </a>
                <h5 className="text-xs mt-2 font-semibold tracking-tight text-gray-900 dark:text-white">{bike.city}</h5>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">₹ {bike.bike_rent}</span>
                    <a href="#" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Book Now</a>
                </div>
                
            </div>
            </div>
          </a>
            ))}
        </div>
        <div> 
        </div>
        <div className="flex items-center justify-center mt-4 mb-5">
        
        <button
          type="submit"
          onClick={() => navigate('/userbikelist')}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          More Bikes
        </button>
        </div>

        <h2 className="text-dark  text-center font-semibold text-4xl mt-8">How to rent a Bike with ZoomBike?</h2>

        <div className="flex">
          <div className="max-w-xs bg-white border border-gray-200 rounded-lg ml-10 mb-5 mt-5">
              <a href="#">
                  <img className="rounded-t-lg" src="https://elluminatimedia.s3.us-west-2.amazonaws.com/wp-content/uploads/2020/07/submitapptogoogleplaystore.jpg" alt="" />
              </a> 
              <div className="p-3">
              <p className="mb-1 font-normal text-center text-dark">Logon to ZoomBike.com</p>
              </div>
          </div>
          <div className="max-w-xs bg-white border border-gray-200 rounded-lg ml-10 mb-5 mt-5">
              <a href="#">
                  <img className="rounded-t-lg" src="https://images.newscientist.com/wp-content/uploads/2022/08/16185328/SEI_119553269.jpg?width=900" alt="" />
              </a> 
              <div className="p-3">
              <p className="mb-1 font-normal text-center text-dark">Select Location and Date</p>
              </div>
          </div>
          <div className="max-w-xs bg-white border border-gray-200 rounded-lg ml-10 mb-5 mt-5">
              <a href="#">
                  <img className="rounded-t-lg" src="https://img.freepik.com/premium-vector/no-credit-card-no-bank-card-icon-cash-only-no-credit-cards-accepted_123447-5828.jpg?w=2000" alt="" />
              </a> 
              <div className="p-3">
              <p className="mb-1 font-normal text-center text-dark">Pick a bike of your choice at 0 Security Deposit.</p>
              </div>
          </div>
          <div className="max-w-xs bg-white border border-gray-200 rounded-lg ml-10 mb-5 mt-5">
              <a href="#">
                  <img className="rounded-t-lg" src="https://imgd.aeplcdn.com/664x374/n/cw/ec/49656/continental-gt-right-front-three-quarter-2.png?isig=0&q=80" alt="" />
              </a> 
              <div className="p-3">
              <p className="mb-1 font-normal text-center text-dark">Zoomaway with the freedom of unlimited KMs</p>
              </div>
          </div>
        </div>
        

    </>
  );
}

export default UserHomeComponent;
