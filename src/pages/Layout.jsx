import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DarkModeToggle from "../pages/darmodeToggle";
import API from "../utils/api";

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const logoutTheUser = () => {
    API.post("/auth/logout");
    navigate("/login");
  };

  useEffect(() => {}, [darkMode]);

  return (
    <div
      className={`${darkMode ? "min-h-screen bg-blue-800" : "min-h-screen bg-white dark:bg-slate-900 text-black dark:text-white"}`}
    >
      <div className="flex items-center justify-between px-8 py-4 bg-white dark:bg-slate-900 shadow-md border-b border-gray-200 dark:border-slate-700">
        <h1 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
          TodoApp
        </h1>
        <div className="flex items-center gap-4">
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <button
            onClick={logoutTheUser}
            className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium 
      hover:bg-red-600 transition shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>
      <Outlet context={{ darkMode }} />
    </div>
  );
};

export default Layout;
