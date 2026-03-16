import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate, Link, useOutletContext } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { darkMode } = useOutletContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  const socialBtnStyle = `w-full py-3 border border-gray-300 rounded-lg font-bold text-[15px] hover:bg-gray-50 transition-colors mb-3`;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 ${darkMode ? "bg-[#1f1f1f] text-white" : "bg-white text-gray-900"}`}>
      
     
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-[#E44232] rounded flex items-center justify-center">
          <span className="text-white font-bold text-xl">✓</span>
        </div>
        <span className="text-2xl font-bold text-[#E44232]">todoApp</span>
      </div>

      <div className="w-full max-w-[400px]">
        <h1 className="text-3xl font-extrabold mb-8 tracking-tight">Welcome back!</h1>

      
        {/* <div className="flex flex-col">
          <button className={socialBtnStyle}>Continue with Google</button>
          <button className={socialBtnStyle}>Continue with Facebook</button>
          <button className={socialBtnStyle}>Continue with Apple</button>
        </div> */}
{/* 
        <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
        </div> */}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold">Email</label>
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
              required
            />
          </div>

          <div className="flex flex-col gap-1 relative">
            <label className="text-[13px] font-bold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-2.5 text-[12px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-tighter"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#E44232] hover:bg-[#c3392b] text-white font-bold py-3 rounded-lg mt-4 transition-all shadow-sm"
          >
            Log in
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-[14px] text-center">
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-gray-900 underline underline-offset-2 hover:no-underline">Sign up</Link>
          </p>
          <div className="mt-4">
            <Link to="/adminlogin" className="text-gray-400 hover:text-gray-600 transition-colors">
              Login as Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;