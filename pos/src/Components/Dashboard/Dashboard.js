import React from "react";
import Dashboardmenu from "./Dashboardmenu";
import Dashbordsection1 from "./Dashbordsection1/Dashbordsection1";
import Dashbordsection2 from "./Dashbordsection2/Dashbordsection2";
import Deshbordsection3 from "./Deshbordsection3/Deshbordsection3";

const Dashboard = () => {
  return (
    <div className="">
      <div style={{ width: "100%", padding: "0px 0" }}>
        <Dashboardmenu />
        <Dashbordsection1 />
        <Dashbordsection2/>
        <Deshbordsection3/>
      </div>
    </div>
  );
};

export default Dashboard;
