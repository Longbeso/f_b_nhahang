import { Routes, Route } from "react-router";
import Admin from "../components/admin/Admin";
import Login from "../components/auth/Login";
import Waiter from "../components/waiter/Waiter";
import ViewWaiter from "../components/waiter/ViewWaiter";
import ViewOrder from "../components/waiter/ViewOrder";
import App from "../App";
import "../components/waiter/waiter.css";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<App />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/waiter" element={<Waiter />}>
        <Route index element={<ViewWaiter />} />
        <Route path="viewOrder" element={<ViewOrder />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
