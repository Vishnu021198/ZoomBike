import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminOwnerlistComponent() {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin/owner-list/');
        setOwners(response.data);
      } catch (error) {
        console.error('Error fetching owners:', error);
      }
    };

    fetchOwners();
  }, []);

  return (
    <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                
                <label for="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-5 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-5 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-5 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-5 py-3">
                            Phone Number
                        </th>
                        <th scope="col" className="px-5 py-3">
                            Details
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {owners.map((owner) => (
                    <tr key={owner.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {owner.id}
                        </th>
                        <th scope="row" className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {owner.name}
                        </th>
                        <td className="px-5 py-4">
                        {owner.email}
                        </td>
                        <td className="px-5 py-4">
                        {owner.phone_number}
                        </td>
                        <td className="px-5 py-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Details
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default AdminOwnerlistComponent