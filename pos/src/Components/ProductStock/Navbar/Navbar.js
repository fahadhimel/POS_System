import React, { useState } from "react";
import "./Navbar.scss";
import UpdateProduct from "./UpdateProduct/UpdateProduct";
import NewProduct from "./NewProduct/NewProduct";

const Navbar = () => {
  const [dateValue, setDateValue] = useState(
    new Date().toISOString().substr(0, 10)
  );
  return (
    <nav className="navbar bg-body-tertiary snav">
      <div>
        <a className="navbar-brand">Product Stock</a>
      </div>
      <div className="navbtndiv">
        <UpdateProduct />
        <NewProduct />

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
    </nav>
  );
};

export default Navbar;
