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
      try {
        await API.delete(`/todo/admin/delete/${id}`);
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  return (
    <div className={`min-h-screen py-8 transition-all ${
      darkMode ? "bg-[#1f1f1f] text-white" : "bg-white text-gray-900"
    }`}>
      
      <div className="mx-auto max-w-4xl px-4">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 border-b pb-6 border-gray-100">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Control Panel</h1>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Manage all tasks: <span className="font-bold text-[#E44232]">{todos.length} total</span>
            </p>
          </div>
          
          <button 
            onClick={fetchAllTodos}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-[13px] font-bold transition-all"
          >
            Refresh Data
          </button>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center py-20 text-gray-400 font-medium">
            Loading tasks...
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-400 text-sm">No todos found in the database.</p>
          </div>
        ) : (
          <div className="flex flex-col border rounded-lg overflow-hidden border-gray-200">
            {todos.map((todo) => (
              <div
                key={todo._id}
                className={`flex items-start justify-between p-5 border-b last:border-b-0 transition-colors ${
                  darkMode 
                    ? "bg-[#1f1f1f] border-gray-800 hover:bg-[#2a2a2a]" 
                    : "bg-white border-gray-100 hover:bg-gray-50"
                }`}
              >
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                      todo.isCompleted 
                        ? "bg-green-100 text-green-700" 
                        : "bg-orange-100 text-orange-700"
                    }`}>
                      {todo.isCompleted ? "Completed" : "Active"}
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">ID: {todo._id.slice(-6)}</span>
                  </div>
                  
                  <h3 className="text-[17px] font-bold leading-tight mb-1">
                    {todo.title}
                  </h3>
                  <p className={`text-[14px] leading-relaxed line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {todo.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-3 opacity-60">
                    <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-[10px] text-gray-700 font-bold">U</div>
                    <span className="text-[12px] font-medium">User: {todo.userId}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="text-gray-400 hover:text-[#E44232] p-2 transition-colors border border-transparent hover:border-gray-200 rounded"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
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