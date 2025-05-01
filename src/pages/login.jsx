import axios from 'axios'
import {useState} from 'react'
import toast from 'react-hot-toast'

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleLogin() {
        try{
            const response = await axios.post("http://localhost:3000/api/user/login", {
                email: email,
                password: password
            })
            toast.success("Login Success")
            // console.log(response.data)
        }
        catch(e){
            toast.error(e.response.data.message)
        }

    }

    return (
        <div className="w-full h-screen bg-[url('/login-background.jpg')] flex  justify-evenly items-center">
            <div className="w-[50%] h-full">

            </div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[400px] h-[500px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center">
                    <input 
                    onChange={
                        (e) => {
                            setEmail(e.target.value)
                        }
                    }
                    value={email}
                    className="w-[300px] h-[40px] boarder-white rounded-[5px] mt-[50px] ml-[50px] bg-green-50">
                    </input>

                    <input 
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }
                    }
                    value={password}
                    type="password" className="w-[300px] h-[40px] boarder-white rounded-[5px] mt-[50px] ml-[50px] bg-green-50">
                    </input>
                    <button onClick={handleLogin} className="w-[300px] h-[40px] text-white font-bold bg-green-500 boarder-white rounded-[5px] mt-[50px] ml-[50px] my-[20px]">Login</button>
                </div>
            </div>
        </div>
    )   
}