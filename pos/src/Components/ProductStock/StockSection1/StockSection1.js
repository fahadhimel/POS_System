import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import "./StockSection1.scss";

const StockSection1 = () => {

  const outOfStokGetData = () => {
    try {
      const item = localStorage.getItem("stokout");
      if (item) {
        return JSON.parse(localStorage.getItem("stokout"));
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [stokData, setStokData] = useState([]);
  const [selectvalue, setSelectvalue] = useState(outOfStokGetData());
  const [stokoutfilterdata, setStokoutfilterdata] = useState([]);

  function ass() {
    try {
      let bar = document.querySelectorAll(".bar1");
      bar.forEach((progre) => {
        let value = Number(progre.getAttribute("data-value"));
        if (Number(selectvalue) === 10) progre.style.width = `${value * 10}%`;
        else if (Number(selectvalue) === 20)
          progre.style.width = `${(value * 20) / 4}%`;
        else if (Number(selectvalue) === 30)
          progre.style.width = `${(value * 30) / 10 + 10}%`;
        else if (Number(selectvalue) === 40)
          progre.style.width = `${(value * 40) / 16}%`;
        else if (Number(selectvalue) === 50)
          progre.style.width = `${(value * 50) / 25}%`;

        if (value > 50) progre.classList.add("background50");
        else if (value > 40) progre.classList.add("background40");
        else if (value > 30) progre.classList.add("background30");
        else if (value > 20) progre.classList.add("background20");
        else if (value > 15) progre.classList.add("background15");
        else if (value > 10) progre.classList.add("background10");
        else if (value > 5) progre.classList.add("background5");
        else if (value >= 1) progre.classList.add("background1");

        let count = 0;
        let progressAnimation = setInterval(() => {
          count++;
          progre.setAttribute("data-text", `${count}`);
          if (count === value) {
            clearInterval(progressAnimation);
          }
        }, 20);
      });
    } catch (error) {
      console.log(error);
    }
  }

  /*********************************out stok******************************************** */

  useEffect(() => {
    try {
      const progresscontainer1 = document.querySelector(".progress1");
      const workObserver = new IntersectionObserver(
        (entries, observer) => {
          const [entry] = entries;
          if (!entry.isIntersecting) return;
          ass();

          observer.unobserve(progresscontainer1);
        },
        {
          root: null,
          threshold: 0,
        }
      );
      workObserver.observe(progresscontainer1);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getStok();
  }, []);

  const getStok = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3001/stok/all`);
      if (response.status === 200) {
        const stokoutfilterdatasort = response.data.sort((a, b) => {
          return a.quantity - b.quantity;
        });
        setStokData(stokoutfilterdatasort);
        const stokoutfilter = stokoutfilterdatasort.filter((fil) => {
          return Number(fil.quantity) <= Number(selectvalue);
        });
        setStokoutfilterdata(stokoutfilter);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("stokout", JSON.stringify(selectvalue));
  }, [Number(selectvalue)]);

  useEffect(() => {
    try {
      setTimeout(() => {
        if (stokoutfilterdata) {
          const stokoutfilterdatasort = stokData.sort((a, b) => {
            return a.quantity - b.quantity;
          });
          const stokoutfilter = stokoutfilterdatasort.filter((fil) => {
            return Number(fil.quantity) <= Number(selectvalue);
          });
          setStokoutfilterdata(stokoutfilter);
        }
      }, 100);
    } catch (error) {
      console.log(error);
    }
  }, [Number(selectvalue)]);

  /**********************************out stok******************************************* */

  return (
    <div className="StockSection1">
      <div className="StockSection1all">
        <div className="StockSection1allleft">
          <div className="StockSection1allleftall">
            <h2>Product Stock</h2>
            <Chart
              type="donut"
              width={600}
              height={450}
              series={stokData.map((res)=>{return res.quantity})}
              options={{
                labels: stokData.map((res)=>{return res.name}),
                title: {
                  text: "All Product in my shop",
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
        <div className="StockSection1allright">
          <div className="StockSection1allrightall">
            <h2>Almost out of stock</h2>
            <div className="StockSection1allrightalllist">
              <div className="input-group mb-3 inputmy">
                <select
                  onChange={(e) => setSelectvalue(e.target.value)}
                  className="custom-select"
                  id="inputGroupSelect02"
                  value={selectvalue}
                >
                  <option>
                    {" "}
                    {selectvalue[0] ? selectvalue : "chose.. Limit"}
                  </option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
              </div>

              <div className="progress1">
                {stokoutfilterdata
                  ? stokoutfilterdata.map((stok) => {
                      return (
                        <div key={stok.id} className="progress_item1 shadow">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <h6 className="progress_title1">{stok.name}</h6>
                            <span className="progress_title1">
                              {" "}
                              Barcode: {stok.id}
                            </span>
                          </div>

                          <div className="progress_bar1 shadow">
                            <div
                              className="bar1"
                              data-value={stok.quantity}
                              data-text={stok.quantity}
                            ></div>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockSection1;
