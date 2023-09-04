import React, { useState, useEffect, useRef } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { FaSearch, FaPlus } from "react-icons/fa";
import axios from "axios";
import ManualCreate from "./ManualCreate/ManualCreate";

const Menusearchbar = ({ passParanData }) => {
  const [search, setSearch] = useState("");
  const [popup, setPopup] = useState(false);


  const [data, setData] = useState([]);

  const [fillterdata, setFillterdata] = useState(data);

  const barcodebtn = useRef(null);
  const searchref = useRef(null);
  const searchbtn = useRef(null);


  const addHandleclick = (id) => {
    if (id) {
      passParanData(id);
      setPopup(false);
    }
    setTimeout(() => {
      passParanData("");
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 200);
  }, []);

  useEffect(() => {
    try {
      if (search !== "") {
        let svalue = search.toLowerCase();
        const filterSearch = data.filter((fil) => {
          const filtername = fil.name.toLowerCase();
          return filtername.startsWith(svalue);
        });
        setFillterdata(filterSearch);
      } else {
        setFillterdata(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  const getData = async () => {
    try {
      const respons = await axios.get(`http://127.0.0.1:3001/stok/all`);
      if (respons.data) {
        setData(respons.data);
        setFillterdata(respons.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    try {
      document.addEventListener("keydown", (e) => {
        if (e.key === "S") {
          handleKeyDown(e.key);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleKeyDown = (event) => {
    try {
      //Check if a specific key is pressed, e.g., Enter key
      if (event === "S") {
        setPopup(true);
        setTimeout(() => {
          searchref.current.focus();
          //document.getElementById("search").focus();
        }, 1000);
      } 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light shadow"
      style={{
        position: "relative",
        //boxShadow: "0 0 20px #d8d9d9",
        borderRadius: "5px",
      }}
    >
      {/* <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button> */}

      <div
        className="collapse navbar-collapse d-flex"
        id="navbarSupportedContent"
      >
        <Modal
          returnFocusAfterClose={false}
          size="lg"
          isOpen={popup}
          toggle={() => setPopup(false)}
        >
          <ModalHeader toggle={() => setPopup(false)}>
            Search Item Name
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col lg={5}>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search"
                    ref={searchref}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <br />
            <Row style={{ height: "50vh", overflow: "auto" }}>
              <Col>
                <table className="table boder table-striped">
                  <thead className="thead-derk  tmc">
                    <tr>
                      <th scope="col">no</th>
                      <th scope="col">Name</th>
                      <th scope="col">ID/Barcode</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                      <th scope="col">Discount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fillterdata &&
                      fillterdata.map((item, index) => {
                        const { name, id, quantity, price, discount } = item;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>
                              <span>
                                <div
                                  style={{ fontFamily: "'Libre Barcode 39'" }}
                                >
                                  {id}
                                </div>
                                <div
                                  style={{
                                    fontSize: ".8rem",
                                    lineHeight: "0px",
                                  }}
                                >
                                  {id}
                                </div>
                              </span>
                            </td>
                            <td>1</td>
                            <td>{price}</td>
                            <td>{discount}</td>
                            <td>
                              <button
                                className="btn"
                                style={{ color: "#727CF9" }}
                                onClick={() => addHandleclick(id)}
                              >
                                <FaPlus />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </Col>
            </Row>
          </ModalBody>
        </Modal>

       
        <ul className="navbar-nav d-flex">
          <li className="nav-item active">
            <a
              ref={barcodebtn}
              className="nav-link p-0 active"
              href="/home"
              style={{
                fontFamily: "'Libre Barcode 39'",
                fontSize: "20px",
                marginLeft: "20px",
                height: "20px",
                color: "blue",
              }}
            >
              12345
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link p-0 "
              href="#"
              style={{ fontSize: ".9rem", margin: "0px 20px", height: "20px" }}
            >
              123
            </a>
          </li>
        </ul>
        <div className=" my-2 my-lg-0" style={{ marginRight: "5px" }}>
          <button
            className="form-control mr-auto btn-info"
            style={{ height: "2rem" }}
            type="search"
            id="search"
            placeholder="Search"
            aria-label="Search"
            ref={searchbtn}
            onClick={() => handleKeyDown("S")}
          >
            <FaSearch style={{ color: "green" }} /> Search
          </button>
        </div>
        <div className=" my-2 my-lg-0 mr-1 ">
          <ManualCreate/>
        </div>
      </div>
    </nav>
  );
};

export default Menusearchbar;
