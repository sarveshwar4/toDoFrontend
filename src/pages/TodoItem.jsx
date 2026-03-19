import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const TodoItem = ({ todo, setTodos }) => {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);


  const registrationDate = new Date(todo.createdAt || Date.now());
  const expirationDate = new Date(registrationDate.getTime() + 2 * 24 * 60 * 60 * 1000);
  
 
  const isCancelled = !isCompleted && new Date() > expirationDate;
  
  
  const isOverdue = !isCompleted && todo.deadline && new Date(todo.deadline) < new Date();

  const handleDelete = async () => {
    try {
      await API.delete(`/todo/delete/${todo._id}`);
      setTodos(prev => prev.filter(t => t._id !== todo._id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = () => {
    if (isCancelled) return; 
    navigate(`/edit/${todo._id}`);
  };

  const handleIsCompletedToggle = async () => {
    if (isCancelled) return; 
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
      ${isCompleted ? "bg-gray-50 border-gray-200 opacity-80" : ""}
      ${isCancelled ? "bg-red-50 border-red-100 opacity-70" : "bg-white border-gray-100 hover:shadow-sm hover:border-gray-200"}`}>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2.5 h-2.5 rounded-full 
              ${isCompleted ? "bg-gray-300" : isCancelled ? "bg-black" : (isOverdue ? "bg-red-600 animate-pulse" : "bg-[#E44232]")}`}>
            </span>
            
            <h3 className={`text-[16px] font-bold tracking-tight transition-all
              ${isCompleted || isCancelled ? "line-through text-gray-400" : "text-gray-900"}`}>
              {todo.title} {isCancelled && <span className="text-red-500 font-normal ml-2">(Expired)</span>}
            </h3>
          </div>

          <p className={`text-[13px] leading-snug mb-3
            ${isCompleted || isCancelled ? "text-gray-400" : "text-gray-600"}`}>
            {todo.description}
          </p>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
           
            <div className="flex items-center gap-1">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Reg: {registrationDate.toLocaleDateString('en-GB')}</span>
            </div>

           
            <div className={`flex items-center gap-1 ${isCancelled ? "text-red-600" : "text-gray-500"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Expires: {expirationDate.toLocaleDateString('en-GB')}</span>
            </div>
            
            
            <div className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? "bg-green-500" : isCancelled ? "bg-black" : "bg-orange-400"}`}></span>
              <span>{isCompleted ? "Done" : isCancelled ? "Cancelled/Expired" : "Pending"}</span>
            </div>
          </div>
        </div>

        
        <div className="flex items-center gap-1">
          {!isCancelled && (
            <>
              <button onClick={handleEdit} className="px-3 py-1.5 rounded-md text-[12px] font-bold text-blue-600 hover:bg-blue-50 transition-colors">
                Edit
              </button>
              <button onClick={handleDelete} className="px-3 py-1.5 rounded-md text-[12px] font-bold text-red-500 hover:bg-red-50 transition-colors">
                Delete
              </button>
              <button
                onClick={handleIsCompletedToggle}
                className={`ml-2 rounded-lg px-4 py-2 text-[12px] font-bold transition-all shadow-sm
                  ${isCompleted ? "bg-gray-200 text-gray-600" : "bg-[#E44232] text-white hover:bg-[#c3392b] active:scale-95"}`}
              >
                {isCompleted ? "✓ Completed" : "Mark Complete"}
              </button>
            </>
          )}
          {isCancelled && (
             <button onClick={handleDelete} className="px-3 py-1.5 rounded-md text-[12px] font-bold text-gray-500 border border-gray-300 hover:bg-gray-100">
                Remove Expired
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;