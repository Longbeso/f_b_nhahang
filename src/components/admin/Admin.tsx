import "./Admin.css";
import { FaBars } from "react-icons/fa";
import SideBar from "./Sidebar";
import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import AuthContext from "../auth/Context.auth";
// import {(Sidebar, Menu, MenuItem, SubMenu)} from 'react-pro-sidebar';
const Admin = () => {
  const { user } = useContext(AuthContext)!;
  const [collapsed, setCollapsed] = useState(false);

  const now = new Date();
  console.log(now.toLocaleDateString());
  return (
    <div className="admin-container">
      {/* <div className="admin-sidebar">
      </div> */}
      <div className="sidebar-sticky-wrapper">
        <SideBar collapsed={collapsed}></SideBar>
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <FaBars
            className="icon-bar"
            onClick={() => setCollapsed(!collapsed)}
          />

          <div className="admin-header-title">
            <h1 className="restaurant-header">Quán ăn phía tây</h1>
            <h5 className="small fst-italic text-white">
              {now.toLocaleDateString()}
            </h5>
          </div>

          <Dropdown>
            <Dropdown.Toggle variant="primary" size="sm">
              Thông tin đăng nhập
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">{user?.userName}</Dropdown.Item>
              <Dropdown.Item href="#/action-2">{user?.role}</Dropdown.Item>
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
