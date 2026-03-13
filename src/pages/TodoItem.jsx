import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const TodoItem = ({todo}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {

    await API.delete(`/todo/delete/${todo._id}`);

    window.location.reload();
  };

  const handleEdit = () => {
    navigate(`/edit/${todo._id}`);
  };

  return(

    <div className="rounded-2xl border border-slate-700 bg-slate-900/40 p-6 shadow-sm shadow-black/20">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{todo.title}</h3>
          <p className="mt-1 text-sm text-slate-300">{todo.description}</p>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:mt-0 sm:flex-row">
          <button
            className="inline-flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="inline-flex items-center justify-center rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500/60"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>

  );

};

export default TodoItem;