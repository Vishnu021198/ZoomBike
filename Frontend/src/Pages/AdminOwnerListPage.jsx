import React from 'react'
import AdminSidebarComponent from '../components/AdminSidebarComponent'
import AdminOwnerlistComponent from '../components/AdminOwnerlistComponent'

function AdminOwnerListPage() {
  return (
    <>
        <AdminSidebarComponent/>
        <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border rounded-lg dark:border-gray-700">
        <div>
            <h4 classNameName="bg-dark font-bold text-5x2 mb-5">Owners</h4>
        </div>
        <AdminOwnerlistComponent/>
        </div>
        </div>
    </>
  )
}

export default AdminOwnerListPage