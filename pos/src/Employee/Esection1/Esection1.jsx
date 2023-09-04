import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowCircleRight } from "react-icons/fa";

import "./Esection1.scss";

const Esection1 = () => {
  const [eshow, setEshow] = useState(false);
  const [eshowdata, setEshowdata] = useState({});
  //const [getemployeedata, setGetemployeedata] = useState([]);
  const [getemployeedatafilter, setGetemployeedatafilter] = useState([]);

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {
    try {
      const response = await axios(`http://127.0.0.1:3001/employee/All`);
      //setGetemployeedata(response.data);
      setGetemployeedatafilter(response.data);
    } catch (error) {}
  };

  const handleDetails = (item) => {
    setEshow(!eshow);
    setEshowdata(item);
    console.log(item);
  };

  return (
    <div className=" shadow p-2 eall">
      <div>
        <div
          className={eshow ? "dark_bg" : ""}
          onClick={() => setEshow(!eshow)}
        ></div>
        <div className={eshow ? "edetails shadow eshow" : "edetails"}>
          <div className="eheader" onClick={() => setEshow(!eshow)}>
            <button className="btn eheaderbtn">
              <FaArrowCircleRight className="eheadericon" />
            </button>
          </div>
          <div className="edetailsitem">
            <div className="edetailsitemdiv">
              <div className="shadow div1">
                <img
                  className="div1img"
                  src="images/fahad.jpg"
                  width="250"
                  alt="imges"
                />
              </div>
              <div className="shadow div2">
                <table className="table boder table-striped">
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>: {eshowdata.name}</td>
                    </tr>
                    <tr>
                      <td>Designation</td>
                      <td>: {eshowdata.designation}</td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td>: {eshowdata.gender}</td>
                    </tr>
                    <tr>
                      <td>Salary</td>
                      <td>: {eshowdata.salary}</td>
                    </tr>
                    <tr>
                      <td>Date of birth</td>
                      <td>: {eshowdata.bdate}</td>
                    </tr>

                    <tr>
                      <td>Phone</td>
                      <td>: 0{eshowdata.phone}</td>
                    </tr>
                    <tr>
                      <td>Emergency phone</td>
                      <td>: 0{eshowdata.ephone}</td>
                    </tr>
                    <tr>
                      <td>Parent name</td>
                      <td>: {eshowdata.parent}</td>
                    </tr>
                    <tr>
                      <td>Parent phone</td>
                      <td>
                        : {eshowdata.pphone ? "0" + eshowdata.pphone : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="shadow div3">
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td>Mail</td>
                      <td>: <a href={eshowdata.email}>{eshowdata.email}</a></td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>: {eshowdata.address}</td>
                    </tr>
                    <tr>
                      <td>Join Date</td>
                      <td>: {eshowdata.createdOn}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="eitem">
        {getemployeedatafilter &&
          getemployeedatafilter.map((item, index) => {
            const { id, name, designation } = item;
            return (
              <div key={index} className="card p-1 shadow card">
                <div className="d-flex align-items-center">
                  <div className="image">
                    <img
                      src="images/About3.jpg"
                      className="rounded"
                    />
                  </div>

                  <div className="ml-3 w-100 p-2">
                    <h4 className="mb-0 mt-0">{item.name}</h4>
                    <span>{item.designation}</span>
                    <div className="mt-2 stats">
                      <hr />
                    </div>
                    <div className="button mt-2 d-flex flex-row align-items-center">
                      <button
                        className="btn btn-sm btn-primary w-100 ml-2"
                        onClick={() => handleDetails(item)}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Esection1;
