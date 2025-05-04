import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

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
                </div>
            </div>
        </div>
    )
}