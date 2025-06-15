import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const accessToken = response.access_token;
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login/google`, {
          accessToken,
        });

        toast.success("Login Successful");
        const token = res.data.token;
        localStorage.setItem("token", token);

        if (res.data.role === "admin") {
          navigate("/admin/");
        } else {
          navigate("/");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Google login failed");
      }
    },
    onError: () => {
      toast.error("Google login failed");
    },
  });



  async function handleLogin() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
        email,
        password,
      });

      toast.success("Login Success");
      localStorage.setItem("token", response.data.token);

      if (response.data.role === "admin") {
        navigate("/admin/");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/login-background.jpg')] bg-cover bg-center flex justify-evenly items-center">
        <div className="hidden md:block md:w-[50%] h-full"></div>

            <div className="w-[95%] md:w-[50%] h-full flex justify-center items-center">
                <div className="w-[400px] h-auto py-10 px-5 backdrop-blur-md bg-white/30 rounded-2xl shadow-2xl flex flex-col justify-center items-center">
                <h2 className="text-2xl font-semibold text-white mb-8">Login to Your Account</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[300px] h-[40px] px-3 rounded-md border border-white bg-green-50 mb-5 focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[300px] h-[40px] px-3 rounded-md border border-white bg-green-50 mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <button
                    onClick={handleLogin}
                    className="w-[300px] h-[40px] text-white font-semibold bg-purple-600 hover:bg-purple-700 active:bg-purple-800 rounded-md mb-4 transition"
                >
                    Login
                </button>

                <button
                    onClick={googleLogin}
                    className="w-[300px] h-[40px] flex items-center gap-4 justify-center gap-2 text-purple-600 font-semibold border border-purple-600 hover:text-white hover:bg-purple-700 active:bg-purple-800 rounded-md transition"
                >
                    <FcGoogle className="text-2xl" />
                    <span>Login with Google</span>
                </button>

                <div className="flex justify-between items-center text-blue-800 gap-10 pt-4 pb-6">
                    <Link to="/register" className="font-italic text-sm text-blue-600 hover:text-blue-800 hover:underline">
                    Register New Account
                    </Link>
                    <Link to="/forget" className="font-italic text-sm text-blue-600 hover:text-blue-800 hover:underline">
                    Forget Password?
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
}
