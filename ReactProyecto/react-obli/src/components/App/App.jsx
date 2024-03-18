import "./App.css";
import 'bootstrap-css-only'
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import NotFound from "../NotFound";
import Register from "../Register/Register";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute redirectTo="/login">
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
