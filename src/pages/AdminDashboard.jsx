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
    <div className={`min-h-screen p-4 md:p-6 ${
      darkMode ? "bg-[#1f1f1f] text-white" : "bg-white text-gray-900"
    }`}>
      
      <div className="max-w-7xl mx-auto">
      
        <div className="mb-8 p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#E44232]">Admin Panel</h1>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Showing all tasks from the database. Total: <span className="font-bold">{todos.length}</span>
            </p>
          </div>
          
          <button 
            onClick={fetchAllTodos}
            className="bg-gray-800 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-700 active:scale-95 transition-all w-full sm:w-auto"
          >
            Refresh List
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 font-medium">
            Loading...
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center py-20 border-4 border-dashed border-gray-100 rounded-2xl">
            <p className="text-gray-400 text-lg font-bold">No tasks found.</p>
          </div>
        ) : (
          
          <div className="grid grid-cols-1 gap-4">
            {todos.map((todo) => {
              
              const createdDate = todo.createdAt ? new Date(todo.createdAt) : new Date();
              const deadlineDate = new Date(createdDate);
              deadlineDate.setDate(createdDate.getDate() + 2);
              const isOverdue = !todo.isCompleted && new Date() > deadlineDate;

              return (
                <div
                  key={todo._id}
                  className={`p-5 rounded-xl border flex flex-col md:flex-row justify-between gap-4 transition-all ${
                    darkMode 
                      ? "bg-[#252525] border-gray-800 hover:border-gray-700" 
                      : "bg-white border-gray-100 hover:shadow-md"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      
                      {todo.isCompleted ? (
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Done</span>
                      ) : isOverdue ? (
                        <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Expired</span>
                      ) : (
                        <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Pending</span>
                      )}
                      
                      <span className="text-[11px] text-gray-400 font-mono">UserName: {todo.userId?.name}</span>
                    </div>
                    
                    <h3 className={`text-lg font-bold mb-1 ${todo.isCompleted ? "line-through opacity-50" : ""}`}>
                      {todo.title}
                    </h3>
                    <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {todo.description}
                    </p>
                    
                   
                    <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium text-gray-400 uppercase">
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className={isOverdue ? "text-red-500 font-bold" : ""}>
                          Due: {deadlineDate.toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Task ID: {todo._id.slice(-6)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="text-red-500 hover:text-red-700 p-2.5 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete this task"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;