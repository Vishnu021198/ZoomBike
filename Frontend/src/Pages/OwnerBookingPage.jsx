import React from 'react'
import OwnerSidebarComponent from '../components/OwnerSidebarComponent'
import OwnerBookingComponent from '../components/OwnerBookingComponent'

function OwnerBookingPage() {
  return (
    <>
    
    <div class="flex flex-wrap bg-gray-100 w-full h-screen">
    <OwnerSidebarComponent/>
    <div className="w-9/12">
        <div className="p-4 text-gray-500">
            <OwnerBookingComponent/>
        </div>
        </div>
    </div>
    
    </>
  )
}

export default OwnerBookingPage