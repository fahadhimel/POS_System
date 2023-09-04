import React from "react";
//import {} from "@coreui/react";
//import { CChart } from "@coreui/react-chartjs";
import Chart from "react-apexcharts";

import "./Dashbordsection2.scss";

function Dashbordsection2() {
  return (
    <div className="Dashbordsection2">
      <div className="Dashbordsection2all">
        <div className="Dashbordsection2left">
          <Chart
            type="line"
            width={720}
            height={400}
            series={[
              {
                name: "Stok",
                data: [
                  50000, 80000, 60000, 100050, 50000, 120000, 80000, 110000,70000, 50000, 50000, 80000,
                ],
              },
              {
                name: "Sell",
                data: [
                  30000, 60000, 70000, 90000, 80000, 100000, 60000, 90000,
                  120000, 65000, 95000, 100020,
                ],
              },
            ]}
            options={{

              title: { text: "Product Stok & sell in 2023" },
              stroke: {
                curve: "smooth",
              },
              xaxis: {
                title: { text: "Product Stok & sell in Year" },
                categories: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
              },
            }}
          />
        </div>
        <div className="Dashbordsection2right">
          <div className="Dashbordsection2rightall">
            <h2>Donut Chart</h2>
            <Chart
              type="pie"
              width={360}
              height={300}
              series={[50, 63, 25, 82, 45, 70, 30, 47, 23, 25]}
              options={{
                labels: ["usa", "chaina", "bangladesh", "india", "uk"],
                title: {
                  text: "Top 10 Sale Troduct This Month",
                },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        total: {
                          show: true,
                          color: "#568",
                        },
                      },
                    },
                  },
                },
                dataLabels: {
                  enabled: true,
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashbordsection2;

