import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserArea from "./pages/UserArea";
import { ToastContainer } from "react-toastify";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import AddData from "./pages/AddData";

const App = () => {
  return (
    <>
      <ToastContainer position="bottom-right"  autoClose={3000} />
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route element={<PublicLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateLayout />}>
          <Route path="/userArea" element={<UserArea />} />
          <Route path="/add-new-data" element={<AddData />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
