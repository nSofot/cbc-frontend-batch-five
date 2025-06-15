import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";


export default function RegisterPage() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()


    async function handleRegister() {
        if (!firstname || !lastname || !email || !password) {
            toast.error("Please fill in all fields")
            return
        }

        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/", {
                firstname,
                lastname,
                email,
                password
            })

            toast.success("Registration Successful")
            localStorage.setItem("token", response.data.token)

            navigate("/login")

        } catch (e) {
            toast.error(e?.response?.data?.message || "Registration failed")
        }
    }


    // const googleLogin = useGoogleRegister({
    //     onSuccess: async (response) => {
    //     try {
    //         const accessToken = response.access_token;
    //         const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login/google`, {
    //         accessToken,
    //         });

    //         toast.success("Register Successful");
    //         const token = res.data.token;
    //         localStorage.setItem("token", token);

    //         if (res.data.role === "admin") {
    //         navigate("/admin/");
    //         } else {
    //         navigate("/");
    //         }
    //     } catch (error) {
    //         toast.error(error?.response?.data?.message || "Google register failed");
    //     }
    //     },
    //     onError: () => {
    //     toast.error("Google register failed");
    //     },
    // });

    return (
        <div className="w-full h-screen bg-[url('/login-background.jpg')] flex justify-evenly items-center">
            <div className="w-[50%] h-full">
            </div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[400px] h-[600px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="w-[300px] h-[40px] border-white rounded-[5px] mt-[30px] ml-[50px] bg-green-50"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className="w-[300px] h-[40px] border-white rounded-[5px] mt-[20px] ml-[50px] bg-green-50"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-[300px] h-[40px] border-white rounded-[5px] mt-[20px] ml-[50px] bg-green-50"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-[300px] h-[40px] border-white rounded-[5px] mt-[20px] ml-[50px] bg-green-50"
                    />
                    <button
                        onClick={handleRegister}
                        className="w-[300px] h-[40px] text-white font-bold bg-green-500 border-white rounded-[5px] mt-[30px] ml-[50px] my-[20px]"
                    >
                        Register
                    </button>

                <button
                    // onClick={googleRegister}
                    className="w-[300px] h-[40px] flex items-center gap-4 justify-center gap-2 text-green-600 font-semibold border border-green-600 hover:text-white hover:bg-green-700 rounded-md transition"
                >
                    <FcGoogle className="text-2xl" />
                    <span>Register with Google</span>
                </button>

                </div>
            </div>
        </div>
    )
}