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
      // Sync parent state if needed
      setTodos(prev => prev.map(t => t._id === todo._id ? { ...t, isCompleted: res.data.todo.isCompleted } : t));
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  return (
    <div className={`group relative overflow-hidden rounded-xl border transition-all duration-200 
      ${isCompleted 
        ? "bg-gray-50 border-gray-200 opacity-75" 
        : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-[#E84E36]/20"
      }`}>
      
      {/* Visual indicator for completed tasks */}
      {isCompleted && (
        <div className="absolute left-0 top-0 h-full w-1 bg-green-500" />
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between p-5 gap-4">
        
        {/* Todo Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-bold tracking-tight mb-0.5 truncate transition-all
            ${isCompleted ? "line-through text-gray-400" : "text-gray-800"}`}>
            {todo.title}
          </h3>
          <p className={`text-sm leading-relaxed max-w-xl
            ${isCompleted ? "text-gray-400" : "text-gray-500"}`}>
            {todo.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="p-2.5 rounded-lg bg-[#EBF2FF] text-blue-600 hover:bg-blue-100 transition-colors"
            title="Edit Task"
          >
            <span className="text-sm font-bold px-1">Edit</span>
          </button>

          <button
            onClick={handleDelete}
            className="p-2.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
            title="Delete Task"
          >
            <span className="text-sm font-bold px-1">Delete</span>
          </button>

          <button
            onClick={handleIsCompletedToggle}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all shadow-sm
              ${isCompleted
                ? "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
                : "bg-green-500 text-white hover:bg-green-600 active:scale-95"
              }`}
          >
            {isCompleted ? "✓ Done" : "Mark Complete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;