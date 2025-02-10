import LoginForm from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Contacts from "@/pages/Contacts";
import { Route, Routes } from "react-router-dom";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default MainRoutes;
