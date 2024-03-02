import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OwnerOTPVerificationComponent() {
    const [otp, setOTP] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem('registeredEmail');
console.log(email,"EMAILLL")
  const submitHandler = async () => {
    try {
      
      const response = await fetch('http://127.0.0.1:8000/api/owner/verify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });

      if (response.ok) {
        setVerificationSuccess(true);
        navigate('/ownerlogin');
      } else {
        console.error('OTP verification failed');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
    }
  };

  return (
    <>
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:sp ace-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-sm">
            <img
            src="https://yt3.googleusercontent.com/ytc/AIf8zZSJPFrHNAsABoBFZaXm4KOC5DIDuA2a8vZw9yuoQg=s900-c-k-c0x00ffffff-no-rj"
            alt="Sample image"
            />
        </div>
        <div className="md:w-1/3 max-w-sm">
            <div className="pb-5">
            <h1 className="text-3xl font-bold">Verify OTP !!</h1>
            <h4>Send to your Email-id</h4>
            </div>
            <input
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
            />
            <div className="text-center md:text-left">
                <button
                className="mt-4 bg-red-600 text-bold hover:bg-white hover:text-red-500 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="button"
                onClick={submitHandler}
                >
                Submit
                </button>
            </div>
            </div>
        </section>
    </>
  )
}

export default OwnerOTPVerificationComponent