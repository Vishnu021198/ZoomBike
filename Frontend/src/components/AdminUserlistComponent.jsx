import React, { useEffect, useState } from 'react'
import axios from 'axios'


function AdminUserlistComponent() {
    // ---------------------------------------------------------------
const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/admin/user-list/")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      });
  }, []); 
//   -----------------------------------------------------------------------------------------------------------
const handleToggleUser = (userId,isActive)=>{
    const action = isActive?"block":"unblock";
    const path = `http://127.0.0.1:8000/api/admin/user/${userId}/${action}/`;
    axios
    .put(path,{})
    .then((response)=>{
        setUsers((prevUsers)=>
        prevUsers.map((user)=>
        user.id ===userId?{...user,is_active: !isActive}:user))
    })
    .catch((error)=>{
        console.log(error,`error${action}ing user:`)
    })
}

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">

                    <label for="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
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
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.id}
              </th>
              <th scope="row" className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.name}
              </th>
              <td className="px-5 py-4">
                {user.email}
              </td>
              <td className="px-5 py-4">
                {user.phone_number}
              </td>
              <td className="px-5  py-4">
                <button onClick={()=>handleToggleUser(user.id,user.is_active)}
                className={`${
                    user.is_active?"bg-red-500":"bg-green-500"

                } text-white rounded px-2 py-1 rounded-md`}
                
                >
                    {user.is_active?"Block":"Unblock"}
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

export default AdminUserlistComponent