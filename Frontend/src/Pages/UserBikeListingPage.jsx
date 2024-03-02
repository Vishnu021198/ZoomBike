import React from 'react'
import UserNavBarComponent from '../components/UserNavBarComponent'
import UserFooterComponent from '../components/UserFooterComponent'
import UserBikeListingComponent from '../components/UserBikeListingComponent'



function UserBikeListingPage() {
  return (
    <>
        <UserNavBarComponent/>
        <UserBikeListingComponent/>
        <UserFooterComponent/>
    </>
  )
}

export default UserBikeListingPage