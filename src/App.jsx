import {Routes,Route,Navigate} from "react-router-dom";

import Login from "./pages/login.jsx";
import Signup from "./pages/signUp.jsx";
import Dashboard from "./pages/dashboard.jsx";
import AddTodo from "./pages/addTodos.jsx";
import EditTodo from "./pages/EditTodo.jsx";

function App(){

  const isLoggedIn = !!localStorage.getItem("token");

  return(

    <div className="min-h-screen bg-slate-900 text-white">
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace/> : <Navigate to="/login" replace/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/add" element={<AddTodo/>}/>
        <Route path="/edit/:id" element={<EditTodo/>}/>

      </Routes>
    </div>

  );

}

export default App;