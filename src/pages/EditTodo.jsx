import React, { useState, useEffect, useCallback } from "react";
import API from "../utils/api";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useOutletContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing data on mount
  const fetchTodo = useCallback(async () => {
    try {
      const response = await API.get(`/todo/${id}`);
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (err) {
      setError("Could not find this todo. It may have been deleted.");
    } finally {
      setIsInitialLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return setError("Fields cannot be empty.");

    setIsUpdating(true);
    try {
      await API.put(`/todo/update/${id}`, { title, description });
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to update. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isInitialLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-slate-900" : "bg-gray-50"}`}>
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-slate-700 rounded-md mb-4"></div>
          <div className="h-64 w-80 bg-slate-800 rounded-2xl"></div>
        </div>
      </div>
    );
  }

 return (
  <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
    darkMode ? "bg-slate-950 text-white" : "bg-gray-50 text-slate-900"
  }`}>
    <div className={`w-full max-w-md rounded-3xl p-8 shadow-2xl border transition-all ${
      darkMode ? "bg-slate-900/80 border-slate-800 shadow-indigo-500/10" : "bg-white border-gray-200 shadow-gray-200"
    } backdrop-blur-xl`}>
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Edit Task</h2>
        <p className={`text-sm mt-1 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
          Modify your task details below.
        </p>
      </div>

      {/* The error message was here - it is now removed */}

      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">Task Title</label>
          <input
            className={`w-full rounded-xl px-4 py-3 outline-none ring-1 transition-all ${
              darkMode ? "bg-slate-800 ring-slate-700 focus:ring-indigo-500" : "bg-gray-100 ring-gray-200 focus:ring-indigo-400"
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">Description</label>
          <textarea
            rows="3"
            className={`w-full rounded-xl px-4 py-3 outline-none ring-1 transition-all resize-none ${
              darkMode ? "bg-slate-800 ring-slate-700 focus:ring-indigo-500" : "bg-gray-100 ring-gray-200 focus:ring-indigo-400"
            }`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <button
            type="submit"
            disabled={isUpdating}
            className={`w-full rounded-xl px-4 py-3.5 text-sm font-bold text-white transition-all ${
              isUpdating ? "bg-indigo-400 cursor-wait" : "bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98]"
            }`}
          >
            {isUpdating ? "Saving Changes..." : "Update Todo"}
          </button>
          
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full py-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
          >
            Discard Changes
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default EditTodo;