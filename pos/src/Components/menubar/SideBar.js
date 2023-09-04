import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Switch } from "antd";

import Routeadmin from "../route/routeadmin";

import {
  FaHome,
  FaDashcube,
  FaUsers,
  FaUserAlt,
  FaSignOutAlt,
  FaDatabase,
  FaList,
  FaCaretLeft,
  FaSlidersH,
} from "react-icons/fa";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        background: "#fff",
      }}
    >
      <div
        style={{
          position: "relative",
          boxShadow: "0 0 20px #EEEFEF",
          width: collapsed ? "15%" : "5%",
          minHeight: "98vh",
          margin: "5px",
          borderRadius: "5px",
          transition: "width .2s",
        }}
      >
        <div 
        style={{position:"fixed",width: collapsed ? "15%" : "5%",
      }} 
        >
          <button
            className="btn m-0"
            onClick={toggleCollapsed}
            style={{
              width: "100%",
              fontSize: "1.5rem",
              textAlign: collapsed ? "end" : "center",
              alignItems:"center",
              transition: "width .2s",
              background: "#E6F4FF",
            }}
          >
            {collapsed ? <FaCaretLeft /> : <FaList />}
          </button>
          <div
            style={{
              padding: "0 10px",
              width: "100%",
              height: "auto",
            }}
          >
            <div style={{ display: collapsed ? "" : "none" }}>
              <div
                style={{
                  width: "100px",
                  alignItems: "center",
                  marginTop: "10px",
                  height: "100px",
                  borderRadius: "50%",
                  boxShadow: "2px 2px 50px #0011",
                  overflow: "hidden",
                }}
              >
                <img
                  style={{
                    width: "100%",

                    minHeight: "100px",
                    alignItems: "center",
                  }}
                  src="images/About3.jpg"
                  className="rounded"
                />
              </div>
              <h6
                style={{
                  marginTop: "10px",
                  padding: "5px",
                  borderRadius: "5px",
                  boxShadow: "0 0 10px #0011",
                }}
              >
                Shop Name
              </h6>
            </div>
          </div>

          <Menu
            style={{ border: "none", width: "100%" }}
            onClick={({ key }) => {
              if (key === "signout") {
                //nbvcxcvbn
              } else {
                navigate(key);
              }
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            //theme="dark"
            inlineCollapsed={!collapsed}
            items={[
              { label: "Home", key: "/", icon: <FaHome /> },
              { label: "Dashbord", key: "/dashbord", icon: <FaDashcube /> },
              { label: "Stock", key: "/stock", icon: <FaDatabase /> },
              { label: "Employee", key: "/employee", icon: <FaUsers /> },
              { label: "Users List", key: "/users", icon: <FaUsers /> },
              { label: "Profile", key: "/profile", icon: <FaUserAlt /> },
              //{ label: "Signout", icon: <FaSignOutAlt /> },
              { label: "Test", key: "/test", icon: <FaSignOutAlt /> },
              { label: "Settings", key: "/settings", icon: <FaSlidersH /> },
            ]}
          ></Menu>
        </div>
      </div>
      <Routeadmin collapsed={collapsed} />
    </div>
  );
};

export default SideBar;
