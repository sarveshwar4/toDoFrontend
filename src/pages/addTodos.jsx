import React,{useState} from "react";
import API from "../utils/api";
import {useNavigate} from "react-router-dom";

const AddTodo = () => {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  const navigate = useNavigate();

  const handleAdd = async () => {

    await API.post("/todo/add",{
      title,
      description
    });

    navigate("/dashboard");
  };

  return(

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-900 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-slate-800/70 p-8 shadow-xl shadow-indigo-950/30 backdrop-blur">
        <h2 className="text-3xl font-semibold text-white text-center">Add Todo</h2>
        <p className="mt-2 text-sm text-slate-300 text-center">Fill in the fields and save to add a new todo.</p>

        <div className="mt-8 space-y-4">
          <input
            className="w-full rounded-xl bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            placeholder="Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />

          <input
            className="w-full rounded-xl bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />

          <button
            className="w-full rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            onClick={handleAdd}
          >
            Add Todo
          </button>
        </div>
      </div>
    </div>

  );

};

export default AddTodo;