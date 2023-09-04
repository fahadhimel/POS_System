import React, { useState } from "react";
import Chart from "react-apexcharts";
import "./Dashbordsection1.scss";

const Dashbordsection1 = () => {
  //option Chart no:1 start
  const [options, setOptions] = useState({
    chart: {
      //type: "area",
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0,
    },
    colors: ["#77AFEC"],
  });
  const [series, setSeries] = useState([
    {
      name: "series1",

      data: [300, 450, 100, 500, 1009, 60, 70, 91, 500],
    },
  ]);
  //option Chart no:1 end
  //option2 Chart no:2 start
  const [options2, setOptions2] = useState({
    chart: {
      //type: "area",
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0,
    },
    colors: ["#eee"],
  });
  const [series2, setSeries2] = useState([
    {
      name: "series1",

      data: [
        200, 40, 100, 800, 50, 109, 600, 70,
      ],
    },
  ]);
  //option2 Chart no:2 end
  //option3 Chart no:3 start
  const [options3, setOptions3] = useState({
    chart: {
      //type: "area",
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    
    stroke: {
      curve: "smooth",
    },
    fill: {
      opacity: 1,
    },
    yaxis: {
      min: 0,
    },
    colors: ["#F79C0D"],
  });
  const [series3, setSeries3] = useState([
    {
      name: "series1",

      data: [800, 100, 500, 800, 109, 709, 901, 50, 209],
    },
  ]);
  //option3 Chart no:3 end
  //option4 Chart no:4 start
  const [options4, setOptions4] = useState({
    chart: {
      type: "bar",
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
      },
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0,
    },
    colors: ["#c93a3ab4"],
  });
  const [series4, setSeries4] = useState([
    {
      name: "series1",

      data: [200, 400, 100, 500, 309, 350, 50, 301, 450, 259],
    },
  ]);
  //option3 Chart no:3 end
  return (
    <div className="Dashbordsection1">
      <div className="Ditem Ditem1">
        <div className="Ditemall">
          <div className="Ditemallleft">
            <h5 className="Ditemalllefthedar">SALES</h5>
            <p className="Ditemalllefttext">40000 TK</p>
          </div>
          {/* <div className="Ditemallright">
            <i className="fas fa-user"></i>
          </div> */}
          <div className="chart1">
            <Chart
              options={options}
              series={series}
              //series={series1}
              type="area"
              height={40}
              width={258}
            />
          </div>
        </div>
      </div>

      <div className="Ditem Ditem2">
        <div className="Ditemall">
          <div className="Ditemallleft">
            <h5 className="Ditemalllefthedar">ORDERS</h5>
            <p className="Ditemalllefttext">2500</p>
          </div>
          {/* <div className="Ditemallright">
            <i class="fa-solid fa-chart-column"></i>
          </div> */}
          <div className="chart1">
            <Chart
              options={options2}
              series={series2}
              //series={series1}
              type="line"
              height={40}
              width={258}
            />
          </div>
        </div>
      </div>

      <div className="Ditem Ditem3">
        <div className="Ditemall">
          <div className="Ditemallleft">
            <h5 className="Ditemalllefthedar">CUSTOMERS</h5>
            <p className="Ditemalllefttext">620</p>
          </div>
          {/* <div className="Ditemallright">
            <i className="fa-solid fa-dollar-sign"></i>
          </div> */}
          <div className="chart1">
            <Chart
              options={options3}
              series={series3}
              //series={series1}
              type="area"
              height={40}
              width={258}
            />
          </div>
        </div>
      </div>

      <div className="Ditem Ditem4">
        <div className="Ditemall">
          <div className="Ditemallleft">
            <h5 className="Ditemalllefthedar">PRODUCT</h5>
            <p className="Ditemalllefttext">50050</p>
          </div>
          {/* <div className="Ditemallright">
            <i className="fa-solid fa-dollar-sign"></i>
          </div> */}
          <div className="chart1">
            <Chart
              options={options4}
              series={series4}
              //series={series1}
              type="bar"
              height={40}
              width={258}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashbordsection1;
