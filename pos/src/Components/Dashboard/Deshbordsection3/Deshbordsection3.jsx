import React, { useState } from "react";
import Chart from "react-apexcharts";
import "./Deshbordsection3.scss";



const Deshbordsection3 = () => {
  return (
    <div className="Deshbordsection3">
      <div className="shadow Deshbordsection3div">
      <Chart
            type="area"
            width={1100}
            height={400}
            series={[
              {
                name: "Stok",
                data: [
                    110000,80000, 100000,100000,90000, 90000,80000, 70000, 100000, 120000, 80000.110000,80000, 100000,100000,90000, 90000,100000,90000, 90000,80000, 70000, 100000, 120000,80000, 100000,100000,90000, 90000,110000
                ],
              },
            ]}
            options={{
              title: { text: "Product sell  in Month Jun-2023" },
              stroke: {
                curve: "straight",
              },
              
                
                
                
                stroke: {
                  curve: "smooth",
                },
                fill: {
                  opacity: 0,
                },
                colors: ["#F9B941"],
              
              xaxis: {
                //title: { text: "Product Stok & sell in Year" },
                categories: [
                  "1 Jun",
                  "2 Jun",
                  "3 Jun",
                  "4 Jun",
                  "5 Jun",
                  "6 Jun",
                  "7 Jun",
                  "8 Jun",
                  "9 Jun",
                  "10Jun",
                  "11Jun",
                  "12Jun",
                  "13Jun",
                  "14Jun",
                  "15Jun",
                  "16Jun",
                  "17Jun",
                  "19Jun",
                  "20Jun",
                  "21Jun",
                  "22Jun",
                  "23Jun",
                  "24Jun",
                  "25Jun",
                  "26Jun",
                  "27Jun",
                  "28Jun",
                  "29Jun",
                  "30Jun",
                  
                ],
              },
            }}
          />
      </div>
    </div>
  );
};

export default Deshbordsection3;
