import React from 'react'
import UserNavBarComponent from '../components/UserNavBarComponent'
import UserProfileComponent from'../components/UserProfileComponent'
import UserFooterComponent from '../components/UserFooterComponent'


function UserProfilePage() {
  return (
    <>
        <UserNavBarComponent/>
        <UserProfileComponent/>
        <UserFooterComponent/>
    </>
  )
}

export default UserProfilePage