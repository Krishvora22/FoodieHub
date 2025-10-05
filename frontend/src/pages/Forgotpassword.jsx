import React from 'react'
import { useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverurl } from '../App';
import { ClipLoader } from 'react-spinners';

const borderColor = '#ddd';

const Forgotpassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`${serverurl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      )
      console.log(result);
      setLoading(false);
      setStep(2);

    } catch (error) {
      setErr(error.response.data.message);
      setLoading(false);
    }
  }

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`${serverurl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }

      )
      console.log(result.data);
      setStep(3);
      setErr("");
      setLoading(false);

    } catch (error) {
      setErr(error.response.data.message);
      setLoading(false);
    }
  }


  const handleResetPassword = async () => {
    setLoading(true);
    if (newPassword !== confirmPassword) {
      setErr("Passwords do not match");
      setLoading(false);
      return;
    }


    if (!newPassword || !confirmPassword) {
      setErr("Please fill all password fields");
      setLoading(false);
      return;
    }



    try {
      const result = await axios.post(`${serverurl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      )
      setErr("");
      console.log(result);
      setLoading(false);
      navigate("/signin");

    } catch (error) {
      setErr(error.response.data.message);
      setLoading(false);

    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen p-4 bg-[#fff9f6] '>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <IoMdArrowBack size={30} className='text-[#ff4d2d]' onClick={() => navigate("/signin")} />
          <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
        </div>
        {step === 1 && <div>
          <div className="mb-6">
            <label htmlFor='email' className='block text-gray-700 font-medium mb-1'>Email</label>
            <input type="email" className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 ' placeholder='Enter your Email' style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <button className="w-full font-semibold py-2 rounded-lg transition-colors duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
            onClick={handleSendOtp} disabled={loading}
          >
            {loading ? <ClipLoader color="white" size={20} /> : "Send OTP"}
          </button>
          {err &&
            <p className='text-red-500 text-center my-[10px]'> *{err}</p>
          }
        </div>
        }

        {step === 2 && <div>
          <div className="mb-6">
            <label htmlFor='otp' className='block text-gray-700 font-medium mb-1'>Enter OTP</label>
            <input type="password" className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 '
              placeholder='Enter OTP'
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              required
            />

          </div>
          <button className="w-full font-semibold py-2 rounded-lg transition-colors duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
            onClick={handleVerifyOtp} disabled={loading}
          >
            {loading ? <ClipLoader color="white" size={20} /> : "Verify OTP"}
          </button>
          {err &&
            <p className='text-red-500 text-center my-[10px]'> *{err}</p>
          }
        </div>
        }

        {step === 3 && <div>
          <div className="mb-6">
            <label htmlFor='newPassword' className='block text-gray-700 font-medium mb-1'>New Password</label>
            <input type="password" className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 '
              placeholder='Enter New Password'
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
            />

          </div>
          <div className="mb-6">
            <label htmlFor='Confirm Password' className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
            <input type="password" className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 '
              placeholder='Confirm Password'
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />

          </div>
          <button className="w-full font-semibold py-2 rounded-lg transition-colors duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
            onClick={handleResetPassword} disabled={loading || newPassword !== confirmPassword || !newPassword || !confirmPassword}
          >
            {loading ? <ClipLoader color="white" size={20} /> : "Reset Password"}
          </button>
          {err &&
            <p className='text-red-500 text-center my-[10px]'> *{err}</p>
          }

        </div>
        }

      </div>
    </div>
  )
}

export default Forgotpassword
