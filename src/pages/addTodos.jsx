import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate, useOutletContext } from "react-router-dom";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { darkMode } = useOutletContext();
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
  
    if (!title.trim() || !description.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await API.post("/todo/add", { title, description });
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to add todo. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all ${
      darkMode ? "bg-slate-950" : "bg-gray-50"
    }`}>
      
      <div className={`w-full max-w-md rounded-3xl p-8 shadow-sm border transition-all ${
        darkMode 
          ? "bg-slate-900 border-slate-800 text-white" 
          : "bg-white border-gray-100 text-slate-900"
      }`}>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#E84E36]/10 text-[#E84E36] mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Create New Task</h2>
          <p className={`text-sm mt-1 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
            Organize your day one task at a time.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-100 text-red-500 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleAdd}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 px-1 text-gray-400">Task Title</label>
            <input
              className={`w-full rounded-xl px-4 py-3.5 outline-none transition-all ${
                darkMode 
                ? "bg-slate-800 text-white focus:ring-2 focus:ring-[#E84E36]/50" 
                : "bg-[#EBF2FF] text-gray-800 focus:ring-2 focus:ring-[#E84E36]/20"
              }`}
              placeholder="Enter the title here..."
              value={title}
              onChange={(e) => {setTitle(e.target.value); setError("");}}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 px-1 text-gray-400">Description</label>
            <textarea
              rows="4"
              className={`w-full rounded-xl px-4 py-3.5 outline-none transition-all resize-none ${
                darkMode 
                ? "bg-slate-800 text-white focus:ring-2 focus:ring-[#E84E36]/50" 
                : "bg-[#EBF2FF] text-gray-800 focus:ring-2 focus:ring-[#E84E36]/20"
              }`}
              placeholder="What needs to be done?"
              value={description}
              onChange={(e) => {setDescription(e.target.value); setError("");}}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full rounded-xl py-4 text-sm font-bold text-white transition-all shadow-lg ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#E84E36] hover:opacity-90 active:scale-[0.97]"
            }`}
          >
            {isLoading ? "Saving..." : "Save Task"}
          </button>
          
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors py-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;