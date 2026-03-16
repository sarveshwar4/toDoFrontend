import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate, Link, useOutletContext } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { darkMode } = useOutletContext();

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/signUp", {
        name,
        email,
        password
      });

      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Signup error");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 
      ${darkMode ? "bg-[#1f1f1f] text-white" : "bg-white text-gray-900"}`}>
      
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-[#E44232] rounded flex items-center justify-center">
          <span className="text-white font-bold text-xl">✓</span>
        </div>
        <span className="text-2xl font-bold text-[#E44232]">todoist</span>
      </div>

      <div className="w-full max-w-[400px]">
        <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Sign Up</h2>
        <p className={`mb-8 text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Create your account to start managing todos.
        </p>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold">Full Name</label>
            <input
              className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:border-gray-600 transition-all
                ${darkMode 
                  ? "bg-[#1f1f1f] border-gray-700 text-white placeholder-gray-500" 
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"}`}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold">Email Address</label>
            <input
              className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:border-gray-600 transition-all
                ${darkMode 
                  ? "bg-[#1f1f1f] border-gray-700 text-white placeholder-gray-500" 
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold">Password</label>
            <input
              className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:border-gray-600 transition-all
                ${darkMode 
                  ? "bg-[#1f1f1f] border-gray-700 text-white placeholder-gray-500" 
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"}`}
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-[#E44232] hover:bg-[#c3392b] text-white font-bold py-3 rounded-lg mt-4 transition-all shadow-sm"
            onClick={handleSignup}
          >
            Sign up
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className={`text-[14px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[#E44232] hover:underline underline-offset-2">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;