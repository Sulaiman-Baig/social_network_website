import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddPost from "./pages/AddPost";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/addpost"
            element={
              <ProtectedRoute>
                <AddPost />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function ProtectedRoute({ children }) {
  if (localStorage.getItem("sulaiman")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
