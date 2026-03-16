import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate, useOutletContext } from "react-router-dom";

const AdminDashboard = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { darkMode } = useOutletContext();

  const fetchAllTodos = async () => {
    try {
      setLoading(true);
      const res = await API.get("todo/admin/all/Todos");
      setTodos(res.data.todos);
    } catch (error) {
      console.error("Error fetching todos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await API.delete(`/todo/admin/delete/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    }
  };

  return (
    <div className={`min-h-screen px-4 py-8 transition-colors duration-300 ${
      darkMode ? "bg-slate-950" : "bg-gray-50"
    }`}>
      
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className={`text-3xl font-extrabold tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}>
              Admin Control Panel
            </h1>
            <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Managing <span className="font-bold text-indigo-500">{todos.length}</span> total tasks across all users.
            </p>
          </div>
          
          <button 
            onClick={fetchAllTodos}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            Refresh Data
          </button>
        </div>

        {/* Dashboard Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
          </div>
        ) : todos.length === 0 ? (
          <div className={`text-center py-20 rounded-3xl border-2 border-dashed ${darkMode ? "border-slate-800" : "border-gray-200"}`}>
            <p className={darkMode ? "text-slate-500" : "text-gray-400"}>No todos found in the database.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {todos.map((todo) => (
              <div
                key={todo._id}
                className={`group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl border transition-all hover:shadow-2xl ${
                  darkMode 
                    ? "bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 shadow-indigo-500/5 text-white" 
                    : "bg-white border-gray-100 hover:border-indigo-300 shadow-gray-200 text-slate-800"
                }`}
              >
                {/* Left Side: Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      todo.isCompleted 
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                        : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                    }`}>
                      {todo.isCompleted ? "Completed" : "In Progress"}
                    </span>
                    <span className="text-[10px] font-mono opacity-40 uppercase">ID: {todo._id.slice(-6)}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold group-hover:text-indigo-500 transition-colors">
                    {todo.title}
                  </h3>
                  <p className={`text-sm mt-1 line-clamp-1 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                    {todo.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-4 text-xs font-medium opacity-60">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"></div>
                    <span>User: {todo.userId}</span>
                  </div>
                </div>

                {/* Right Side: Actions */}
                <div className="flex items-center gap-3 mt-6 md:mt-0 md:ml-6">
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all border border-red-500/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;