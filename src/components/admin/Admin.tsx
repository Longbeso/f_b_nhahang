import "./Admin.css";
import { FaBars } from "react-icons/fa";
import SideBar from "./Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
// import {(Sidebar, Menu, MenuItem, SubMenu)} from 'react-pro-sidebar';
const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed}></SideBar>
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <FaBars
            className="icon-bar"
            onClick={() => setCollapsed(!collapsed)}
          />
          <h1 className="restaurant-header">Quán ăn phía tây</h1>
          <Dropdown>
            <Dropdown.Toggle variant="primary" size="sm">
              Thông tin đăng nhập
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
