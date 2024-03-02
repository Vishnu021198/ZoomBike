import React from 'react'
import AdminSidebarComponent from '../components/AdminSidebarComponent'
import AdminUserlistComponent from '../components/AdminUserlistComponent'


function AdminUserListPage() {
  return (
    <>
        <AdminSidebarComponent/>
        <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border rounded-lg dark:border-gray-700">
        <div>
            <h3 classNameName="bg-dark font-bold text-5xl mb-5">Customers</h3>
        </div>
        <AdminUserlistComponent/>
        </div>
        </div>
    </>
  )
}

export default AdminUserListPage