import React,{useState} from "react";

const Dashboardmenu = () => {
  const [dateValue, setDateValue] = useState(
    new Date().toISOString().substr(0, 10)
  );
  return (
    <nav
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 50px",
        boxShadow: "2px 2px 20px #E2E3E3",
        borderRadius: "5px",
        width:"100%"
      }}
      className="navbar bg-body-tertiary"
    >
      <div>
        <a className="navbar-brand">Dashboard</a>
      </div>
      <div style={{ position: "relative", display: "flex" }}>
        {/* <input type="Date" className="form-control" /> */}
        <input
          className="form-control"
          type="Date"
          value={dateValue}
          onChange={(e) => setDateValue(e.target.value)}
        />
        <button
          style={{
            background: "#727CF9",
            borderRadius: "4px",
            margin: "0 5px",
          }}
          className="btn btn-primary"
          type="submit"
        >
          <i className="fa-solid fa-rotate"></i>
        </button>
        <button
          style={{ background: "#727CF9", borderRadius: "4px" }}
          className="btn btn-primary"
          type="submit"
        >
          <i className="fa-solid fa-arrow-down-wide-short"></i>
        </button>
      </div>
    </nav>
  );
};

export default Dashboardmenu;
