import React from 'react'
import AdminSidebarComponent from '../components/AdminSidebarComponent'
import AdminTransactionComponent from '../components/AdminTransactionComponent'

function AdminTransactionPage() {
  return (
    <>
        <AdminSidebarComponent/>
        <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border rounded-lg dark:border-gray-700">
        <div>
            <h3 classNameName="bg-dark font-bold text-5xl mb-5">Transactions</h3>
        </div>
        <AdminTransactionComponent/>
        </div>
        </div>  
    </>
  )
}

export default AdminTransactionPage