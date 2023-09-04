import React, { useState } from "react";
import "./Unavbar.scss";
//import NewE from "./newEmployee/NewE";
//import UpdateDeleteEmployee from "./UpdateEmployee/UpdateDeleteEmployee";

const Enavbar = () => {
  const [dateValue, setDateValue] = useState(
    new Date().toISOString().substr(0, 10)
  );
  return (
    <nav className="navbar bg-body-tertiary  ">
      <div className=" container divnav">
        <div>
          <a className="navbar-brand">Users List</a>
        </div>
        <div className="navbtndiv">
          {/* <NewE />
          <UpdateDeleteEmployee /> */}
          <input
            className="form-control inputstyle"
            type="Date"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
          />
          <button className="btn btn-primary btnstyle" type="submit">
            <i className="fa-solid fa-rotate"></i>
          </button>
          <button className="btn btn-primary btnstyle" type="submit">
            <i className="fa-solid fa-arrow-down-wide-short"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Enavbar;
