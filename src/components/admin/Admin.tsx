import "./Admin.css";
import { FaBars } from "react-icons/fa";
import SideBar from "./Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
// import {(Sidebar, Menu, MenuItem, SubMenu)} from 'react-pro-sidebar';
const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed}></SideBar>
      </div>
      <div className="admin-content">
        <div className="header">
          <FaBars onClick={() => setCollapsed(!collapsed)} />
          <h1>Quán ăn phía tây</h1>
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
