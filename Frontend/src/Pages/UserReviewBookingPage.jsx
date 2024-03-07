import React from 'react'
import UserNavBarComponent from '../components/UserNavBarComponent'
import UserFooterComponent from '../components/UserFooterComponent'
import UserReviewBookingComponent from '../components/UserReviewBookingComponent'

function UserReviewBookingPage() {
  return (
    <>
        <UserNavBarComponent/>
        <UserReviewBookingComponent/>
        <UserFooterComponent/>
    </>
  )
}

export default UserReviewBookingPage