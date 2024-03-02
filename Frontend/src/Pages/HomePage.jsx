import React from 'react'
import UserNavBarComponent from '../components/UserNavBarComponent'
import UserHomeComponent from '../components/UserHomeComponent'
import UserFooterComponent from '../components/UserFooterComponent'

function HomePage() {
  return (
    <>
    <UserNavBarComponent/>
    <UserHomeComponent/>
    <UserFooterComponent/>
    </>
  )
}

export default HomePage