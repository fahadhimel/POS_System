import React from "react";
import Navbar from "./Navbar/Navbar";
import StockSection1 from "./StockSection1/StockSection1";

const Stock = () => {
  return (
    <div className="">
      <div style={{ width: "100%",  padding: "0px 0" }}>
        <Navbar />
        <StockSection1 />
      </div>
    </div>
  );
};

export default Stock;
