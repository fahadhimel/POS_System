import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../Home/Home";
import Dashboard from "../Dashboard/Dashboard";
import Stock from "../ProductStock/Stock";
import TestComponents from "../TestComponents/TestComponents";
import Employee from "../../Employee/Employee";
import Users from "../Users/Users";
import Profile from "../Profile/Profile";

const routeadmin = ({collapsed}) => {
  return (
    <div style={{width:collapsed?"84%":"94%",
    transition:"width .2s"}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashbord" element={<Dashboard />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/test" element={<TestComponents />} />
      </Routes>
    </div>
  );
};

export default routeadmin;
