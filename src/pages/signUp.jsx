import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try{

      await API.post("/auth/signUp",{
        name,
        email,
        password
      });

      navigate("/login");

    }catch(err){
      alert(err.response?.data || "Signup error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-900 px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-800/70 p-8 shadow-xl shadow-indigo-950/30 backdrop-blur">
        <h2 className="text-3xl font-semibold text-white text-center">Sign Up</h2>
        <p className="mt-2 text-sm text-slate-300 text-center">Create your account to start managing todos.</p>

        <div className="mt-8 space-y-4">
          <input
            className="w-full rounded-xl bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            className="w-full rounded-xl bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            className="w-full rounded-xl bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            className="w-full rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            onClick={handleSignup}
          >
            Sign up
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-300">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-200 hover:text-white">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;