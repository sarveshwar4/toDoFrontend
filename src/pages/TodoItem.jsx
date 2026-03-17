import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const TodoItem = ({ todo, setTodos }) => {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  const handleDelete = async () => {
    try {
      await API.delete(`/todo/delete/${todo._id}`);
      setTodos(prev => prev.filter(t => t._id !== todo._id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${todo._id}`);
  };

  const handleIsCompletedToggle = async () => {
    try {
      const res = await API.put(`/todo/markAsCompleted/${todo._id}`);
      setIsCompleted(res.data.todo.isCompleted);
      setTodos(prev => prev.map(t => t._id === todo._id ? { ...t, isCompleted: res.data.todo.isCompleted } : t));
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  return (
    <div className={`group relative p-4 mb-3 border rounded-xl transition-all duration-200 
      ${isCompleted 
        ? "bg-gray-50 border-gray-200 opacity-80" 
        : "bg-white border-gray-100 hover:shadow-sm hover:border-gray-200"
      }`}>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {/* Simple Priority Dot */}
            <span className={`w-2 h-2 rounded-full ${isCompleted ? "bg-gray-300" : "bg-[#E44232]"}`}></span>
            
            <h3 className={`text-[16px] font-bold tracking-tight transition-all
              ${isCompleted ? "line-through text-gray-400" : "text-gray-900"}`}>
              {todo.title}
            </h3>
          </div>

          <p className={`text-[13px] leading-snug mb-3
            ${isCompleted ? "text-gray-400" : "text-gray-600"}`}>
            {todo.description}
          </p>

          {/* New Metadata Section - Looking Like Human Written Code */}
          <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {/* Fallback to 'Today' if createdAt is missing */}
              <span>Registered: {todo.createdAt ? new Date(todo.createdAt).toLocaleDateString('en-GB') : "Recently"}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? "bg-green-500" : "bg-orange-400"}`}></span>
              <span>{isCompleted ? "Done" : "Pending"}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleEdit}
            className="px-3 py-1.5 rounded-md text-[13px] font-bold text-blue-600 hover:bg-blue-50 transition-colors"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="px-3 py-1.5 rounded-md text-[13px] font-bold text-red-500 hover:bg-red-50 transition-colors"
          >
            Delete
          </button>

          <button
            onClick={handleIsCompletedToggle}
            className={`ml-2 rounded-lg px-4 py-2 text-[13px] font-bold transition-all shadow-sm
              ${isCompleted
                ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
                : "bg-[#E44232] text-white hover:bg-[#c3392b] active:scale-95"
              }`}
          >
            {isCompleted ? "✓ Completed" : "Mark Complete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;