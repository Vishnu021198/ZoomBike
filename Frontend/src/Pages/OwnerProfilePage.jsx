import React from 'react'
import OwnerProfileComponent from '../components/OwnerProfileComponent'
import OwnerSidebarComponent from '../components/OwnerSidebarComponent'
import OwnerAddBikeComponent from '../components/OwnerAddBikeComponent'

function OwnerProfilePage() {
  return (
    <>  
      <div class="flex flex-wrap bg-gray-100 w-full h-screen">
      <OwnerSidebarComponent/>
      <div className="w-9/12">
            <div className="p-4 text-gray-500">
              <OwnerProfileComponent/>
              <OwnerAddBikeComponent/>
            </div>
            </div>
      </div>
    </>
  )
}

export default OwnerProfilePage