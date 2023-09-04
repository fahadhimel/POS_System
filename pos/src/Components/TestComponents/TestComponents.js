import React, { useState } from "react";
import Chart from "react-apexcharts";

const TestComponents = () => {
  const [options, setOptions] = useState(
    // {
    //   chart: {
    //     id: "tw",
    //     //group: "social",
    //     type: "area",
    //     height: 160,
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },

    //   colors: ["#008FFB", "#138964"],

    // },

    {
      chart: {
        type: "area",
        height: 160,
        sparkline: {
          enabled: true,
        },
        animations: {
          enabled: true
        },
        zoom: {
          enabled: true
        },
      },
      tooltip: {
        fixed: {
          enabled: true,
          
        },
        x: {
          show: true
        },
        y: {
          show: true
          
        },
        marker: {
          show: true
        }
      },
      stroke: {
        curve: "smooth",
      },
      fill: {
        opacity: 0,
      },
      yaxis: {
        min: 2,
      },
      xaxis:{
        min:0.5
      },
      colors: ["#F9B941"],
    }
  );
  const [series, setSeries] = useState([
    {
      name: "series1",

      data: [30, 40, 45, 500, 5009, 60, 70, 91, 5000],
    },
  ]);
  return (
    // <div className="Dashbordsection1">
    //   <div className="Ditem" style={{background:"#F79D0E",}}>
    //     <div className="Ditemall">
    //       <div className="Ditemallleft">
    //         <h5 className="Ditemalllefthedar">Orders</h5>
    //         <p className="Ditemalllefttext">$40.000</p>
    //       </div>

    //       <div className="Ditemallright">
    //         <i className="fas fa-user"></i>
    //       </div>
          <div id="chart-spark1" style={{position:"fixed",}}>
          <Chart
            options={options}
            series={series}
            //series={series1}
            type="area"
            height={200}
            width={600}
          />
          </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default TestComponents;
