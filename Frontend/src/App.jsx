import { useState } from 'react'
import { Route,Router,Routes } from 'react-router-dom'
import { UserLoginPage } from './Pages/UserLoginPage'
import { UserSignupPage } from './Pages/UserSignupPage'
import { OwnerLoginPage } from './Pages/OwnerLoginPage'
import { OwnerSignupPage } from './Pages/OwnerSignupPage'
import { AdminLoginPage } from './Pages/AdminLoginPage'
import HomePage from './Pages/HomePage'
import AdminUserListPage from './Pages/AdminUserListPage'
import AdminOwnerListPage from './Pages/AdminOwnerListPage'
import OwnerProfilePage from './Pages/OwnerProfilePage'
import UserOTPVerificationPage from './Pages/UserOTPVerificationPage'
import OwnerOTPVerificationPage from './Pages/OwnerOTPVerificationPage'
import UserBikeListingPage from './Pages/UserBikeListingPage'
import OwnerBikeListPage from './Pages/OwnerBikeListPage'
import UserProfilePage from './Pages/UserProfilePage'
import UserBikeDetailPage from './Pages/UserBikeDetailPage'
import UserReviewBookingPage from './Pages/UserReviewBookingPage'
import UserBookingPage from './Pages/UserBookingPage'
import UserOrderConfirmedPage from './Pages/UserOrderConfirmedPage'
function App() {
  

  return (
    <>
      <div>
        <Routes>

          <Route path="/login" element={<UserLoginPage/>}/>
          <Route path="/verifyOTP" element={<UserOTPVerificationPage/>}/>
          <Route path="/signup" element={<UserSignupPage/>}/>
          <Route path="/ownersignup" element={<OwnerSignupPage/>}/>
          <Route path="/ownerverifyOTP" element={<OwnerOTPVerificationPage/>}/>
          <Route path="/ownerlogin" element={<OwnerLoginPage/>}/>        
          <Route path="/adminlogin" element={<AdminLoginPage/>}/>
          <Route path="/homepage" element={<HomePage/>}/>
          <Route path="/adminuserlist" element={<AdminUserListPage/>}/>
          <Route path="/adminownerlist" element={<AdminOwnerListPage/>}/>
          <Route path="/ownerprofile" element={<OwnerProfilePage/>}/>
          <Route path="/userbikelist" element={<UserBikeListingPage/>}/>
          <Route path="/ownerbikelist" element={<OwnerBikeListPage/>}/>
          <Route path="/userprofile" element={<UserProfilePage/>}/>
          <Route path="/userbikedetail" element={<UserBikeDetailPage />}/>
          <Route path="/userreviewbooking" element={<UserReviewBookingPage/>}/>
          <Route path="/userbooking" element={<UserBookingPage/>}/>
          <Route path="/userorderconfirmed" element={<UserOrderConfirmedPage/>}/>
        
        </Routes>
      </div>
    </>
  )
}

export default App
