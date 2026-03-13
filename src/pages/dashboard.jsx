import React, { useEffect, useState } from "react";
import API from "../utils/api";
import TodoItem from "./TodoItem";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTodos = async (search = "") => {
    try {

      const response = await API.get(
        `/todo/all?search=${search}`
      );

      setTodos(response.data.todos);

    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const handleSearch = () => {
    fetchTodos(searchTerm);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-900 px-4 py-12">

      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-slate-800/60 p-8 shadow-xl backdrop-blur">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <h2 className="text-3xl font-semibold text-white">
            Your Todos
          </h2>

          <Link
            to="/add"
            className="rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            + Add Todo
          </Link>

        </div>

        {/* SEARCH BAR */}

        <div className="mt-6 flex gap-4">

          <input
            type="text"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-white"
          />

          <button
            onClick={handleSearch}
            className="rounded-xl bg-indigo-500 px-6 py-3 text-white hover:bg-indigo-600"
          >
            Search
          </button>

        </div>

      

        <div className="mt-8 space-y-4">

          {todos.length === 0 ? (
            <p className="text-slate-300">
              No todos found.
            </p>
          ) : (
            todos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))
          )}

        </div>

      </div>

    </div>

  );
};

export default Dashboard;