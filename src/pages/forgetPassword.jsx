import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function ForgetPasswordPage(){
    const [otpSent, setotp] = useState(false)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()
    
    function sendOtp(){
        console.log(email)
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/send-OPT", {
            email: email            
        }).then((response)=>{
            setotp(true)
            toast.success("OTP sent to your email check your inbox")
            console.log(response.data)
        }).catch((error)=>{
            console.error(error)
        })
    }

    function verifyOtp(){
        const otpInNumberFormat = parseInt(otp, 10);
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/reset-password", {
            email: email,
            otp: otpInNumberFormat,
            newPassword: newPassword,
        }).then((response)=>{
            toast.success("OTP verified successfully")
            console.log(response.data)
            navigate("/login")
        }).catch((error)=>{
            console.error(error)
            toast.error("Invalid OTP")
        })
    }

    return(
        <div className="w-full h-screen bg-[url('/login-background.jpg')] bg-cover bg-center flex justify-evenly items-center">
            <div className="hidden md:block md:w-[50%] h-full flex justify-center items-center">
                {/* <div className="w-[300px] h-[300px] py-1 px-1 rounded-2xl shadow-2xl">
                    <img
                        src="/login-background.jpg"
                        alt="Login Background"
                        className="w-full h-full object-cover"
                    />
                </div> */}
            </div>


            <div className="w-[95%] md:w-[50%] h-full flex justify-center items-center">
                {/* <div className="w-[400px] h-auto py-10 px-5 backdrop-blur-md bg-white/30 rounded-2xl shadow-2xl flex flex-col justify-center items-center"> */}
                   
                    {
                        otpSent?
                        <div className="w-[400px] h-auto py-10 px-5 backdrop-blur-md bg-white/30 rounded-2xl shadow-2xl flex flex-col justify-center items-center">
                             <h2 className="text-2xl font-semibold text-white mb-8">Reset Password</h2>
                            <input 
                                type="text"
                                placeholder="Enter your OTP" 
                                className="w-[300px] h-[40px] px-3 rounded-md border border-white bg-green-50 mb-5 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                value={otp} onChange={(e)=>setOtp(e.target.value)}
                            />
                            <input 
                                type="password" 
                                placeholder="Enter new password" 
                                className="w-[300px] h-[40px] px-3 rounded-md border border-white bg-green-50 mb-5 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                value={newPassword} 
                                onChange={(e)=>setNewPassword(e.target.value)}
                            />
                            <input 
                                type="password" 
                                placeholder="Confirm new password" 
                                className="w-[300px] h-[40px] px-3 rounded-md border border-white bg-green-50 mb-5 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                value={confirmPassword} 
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                            />
                            <button 
                                className="w-[300px] h-[40px] text-white font-semibold bg-purple-600 hover:bg-purple-700 active:bg-purple-800 rounded-md mb-4 transition" 
                                onClick={verifyOtp}>
                                Verify OTP
                            </button>
                            {/* resend otp button that sets sentOtp false */}
                            <button 
                                className="w-[300px] h-[40px] flex items-center gap-4 justify-center gap-2 text-purple-600 font-semibold border border-purple-600 hover:text-white hover:bg-purple-700 active:bg-purple-800 rounded-md transition"
                                onClick={()=>setotp(false)}>
                                Resend OTP
                            </button>
                        </div>:

                        <div className="w-[400px] h-auto py-10 px-5 backdrop-blur-md bg-white/30 rounded-2xl shadow-2xl flex flex-col justify-center items-center">
                            <h2 className="text-2xl font-semibold text-white mb-8">Reset Password</h2>
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="w-[300px] h-[40px] px-3 rounded-md border border-white bg-green-50 mb-5 focus:outline-none focus:ring-2 focus:ring-purple-400" 
                                value={email} 
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <button 
                                className="w-[300px] h-[40px] text-white font-semibold bg-purple-600 hover:bg-purple-700 active:bg-purple-800 rounded-md mb-4 transition" 
                                onClick={sendOtp}>
                                Send OTP
                            </button>
                        </div>

                    }
                {/* </div> */}
            </div>
        </div>
    )
}