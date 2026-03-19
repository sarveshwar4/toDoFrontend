import React, { useEffect, useState } from "react";
import API from "../utils/api";
import TodoItem from "./TodoItem";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { darkMode } = useOutletContext();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const navigate = useNavigate();

  const isAuthenticated = async () => {
    try {
      await API.get("auth/check");
    } catch (error) {
      navigate("/login");
      console.error("Error checking authentication", error);
    }
  };
  const primaryRed = "#E84E36";
  const inputBlue = "#EBF2FF";

  const fetchTodos = async (search = "") => {
    try {
      const response = await API.get(`/todo/all?search=${search}`);
      setTodos(response.data.todos);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const handleSearch = () => {
    fetchTodos(searchTerm);
  };

  const markAllCompleted = async () => {
    try {
      await API.put(`/todo/markallcompleted`);
      // reload the page
      document.location.reload();
      // setTodos((prev) =>
      //   prev.map((todo) => ({
      //     ...todo,
      //     isCompleted: true,
      //   })),
      // );
    } catch (err) {
      console.error("Error updating todos", err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
    try {
      const response = await isAuthenticated(); 
        fetchTodos();  
    } catch (error) {
      console.error("Auth failed:", error);
    }
  };

  checkAuth();
  }, []);

  if(!isLoggedIn) navigate("/login");

  return (
    <div
      className={`min-h-screen px-4 py-8 md:px-6 md:py-12 transition-all ${
        darkMode ? "bg-slate-950" : "bg-gray-50"
      }`}
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-[#E84E36] text-white p-1 rounded-md font-bold text-xl">
            ✓
          </div>
          <span className="text-2xl font-bold text-[#E84E36] tracking-tight">
            todoApp
          </span>
        </div>

        <div
          className={`rounded-2xl p-6 md:p-10 shadow-sm border ${
            darkMode
              ? "bg-slate-900 border-slate-800 text-white"
              : "bg-white border-gray-100 text-gray-900"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-1">
                My Tasks
              </h1>
              <p className="text-gray-500 text-sm">
                Organize your day, one task at a time.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/add"
                className="rounded-lg bg-[#E84E36] px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 transition shadow-md"
              >
                + Add New
              </Link>
              <button
                onClick={markAllCompleted}
                className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
              >
                Mark all done
              </button>
            </div>
          </div>

          <div className="mt-10 flex gap-2">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`flex-1 rounded-lg px-4 py-3 border-none outline-none focus:ring-2 focus:ring-[#E84E36]/20 transition ${
                darkMode
                  ? "bg-slate-800 text-white"
                  : "bg-[#EBF2FF] text-gray-800"
              }`}
            />
            <button
              onClick={handleSearch}
              className="rounded-lg bg-gray-800 px-6 py-3 text-white font-medium hover:bg-gray-900 transition"
            >
              Search
            </button>
          </div>

          <div className="mt-8 space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-xl">
                <p className="text-gray-400 font-medium">
                  No tasks found. Start by adding one!
                </p>
              </div>
            ) : (
              <div className="grid gap-3">
                {todos.map((todo) => (
                  <TodoItem key={todo._id} todo={todo} setTodos={setTodos} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center text-xs text-gray-400 gap-4 uppercase tracking-widest font-semibold">
          <span>Total: {todos.length}</span>
          <span>•</span>
          <span>Done: {todos.filter((t) => t.isCompleted).length}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
