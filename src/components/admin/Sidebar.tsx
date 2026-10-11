import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
// SubMenu
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";

const SideBar = (prop: any) => {
  const { collapsed } = prop;
  return (
    <div className="side-bar">
      <Sidebar collapsed={collapsed} backgroundColor="#142947">
        <Menu
          menuItemStyles={{
            button: {
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#13395e",
              },
            },
          }}
        >
          {/* <SubMenu label="USER">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
            </SubMenu> */}
          <MenuItem
            icon={<MdSpaceDashboard />}
            component={<Link to="dashboard" />}
          >
            {" "}
            DASHBOARD{" "}
          </MenuItem>
          <MenuItem icon={<FaRegUserCircle />} component={<Link to="user" />}>
            {" "}
            USER{" "}
          </MenuItem>
          <MenuItem
            icon={<MdOutlineRestaurantMenu />}
            component={<Link to="menu" />}
          >
            {" "}
            MENU{" "}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
