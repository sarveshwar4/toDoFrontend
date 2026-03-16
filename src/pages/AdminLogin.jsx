import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate, Link, useOutletContext } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { darkMode } = useOutletContext();

  const handleAdminLogin = async () => {
    try {
      const res = await API.post("/auth/admin/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "admin");

      navigate("/admin/dashboard");
    } catch (error) {
      alert("Admin login failed");
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen px-4
      ${darkMode ? "bg-[#1f1f1f] text-white" : "bg-white text-gray-900"}`}>
      
      {/* Brand Logo Section */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-[#E44232] rounded flex items-center justify-center">
          <span className="text-white font-bold text-xl">✓</span>
        </div>
        <span className="text-2xl font-bold text-[#E44232]">todoist</span>
      </div>

      <div className="w-full max-w-[400px]">
        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-2 tracking-tight">
          Admin Panel
        </h2>

        <p className={`mb-8 text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Login to manage all users' todos
        </p>

        {/* Form */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold">Admin Email</label>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:border-gray-600 transition-all
                ${darkMode 
                  ? "bg-[#1f1f1f] border-gray-700 text-white" 
                  : "bg-white border-gray-300 text-gray-900"}`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:border-gray-600 transition-all
                ${darkMode 
                  ? "bg-[#1f1f1f] border-gray-700 text-white" 
                  : "bg-white border-gray-300 text-gray-900"}`}
            />
          </div>

          <button
            onClick={handleAdminLogin}
            className="w-full bg-[#E44232] hover:bg-[#c3392b] text-white font-bold py-3 rounded-lg mt-4 transition-all shadow-sm"
          >
            Login as Admin
          </button>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className={`text-[14px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Want to login as a normal user?
          </p>
          <div className="mt-2">
            <Link
              to="/login"
              className="font-medium text-[#E44232] hover:underline"
            >
              ← Login as User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;