import React from 'react'
import OwnerSidebarComponent from '../components/OwnerSidebarComponent'
import OwnerBikeListingComponent from '../components/OwnerBikeListingComponent'

function OwnerBikeListPage() {
  return (
    <>  
      <div class="flex flex-wrap bg-gray-100 w-full h-screen">
      <OwnerSidebarComponent/>
      <div className="w-9/12">
            <div className="p-4 text-gray-500">
              <OwnerBikeListingComponent/>
            </div>
            </div>
      </div>
    </>
  )
}

export default OwnerBikeListPage