import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login.jsx";
import Signup from "./pages/signUp.jsx";
import Dashboard from "./pages/dashboard.jsx";
import AddTodo from "./pages/AddTodos.jsx";
import EditTodo from "./pages/EditTodo.jsx";
import Layout from "./pages/Layout.jsx";
import Togglecontext from "./utils/Togglecontext.js";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
function App() {

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Routes>

      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />


      {/* Parent Route */}
      <Route element={<Layout />}>
       <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup />} />
       <Route path = "/adminlogin" element = {<AdminLogin />} />
        <Route path = "/admin/dashboard" element = {<AdminDashboard/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddTodo />} />
        <Route path="/edit/:id" element={<EditTodo />} />
      </Route>

    </Routes>
  );
}

export default App;