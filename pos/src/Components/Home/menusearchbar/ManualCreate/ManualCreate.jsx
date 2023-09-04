import React, { useState, useEffect, useRef } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { FaSearch, FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const localStorageGetData = () => {
  try {
    const item = localStorage.getItem("items");
    if (item) {
      return JSON.parse(localStorage.getItem("items"));
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

const ManualCreate = () => {
  const [mpopup, setMPopup] = useState(false);
  const manualbtn = useRef(null);
  const [sdata, setSdata] = useState(localStorageGetData());
  const [fromdata, setFromdata] = useState({
    name: "",
    quantity: "",
    price: "",
    discount: "",
    tax: "",
  });
  const { name, quantity, price, discount, tax } = fromdata;

  useEffect(() => {
    try {
      document.addEventListener("keydown", (e) => {
        if (e.key === "M") {
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
      if (event === "M") {
        setMPopup(true);
        setTimeout(() => {
          //searchref.current.focus();
          //document.getElementById("search").focus();
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFromData = (e) => {
    try {
      setFromdata({ ...fromdata, [e.target.name]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormsubmit = (e) => {
    e.preventDefault();
    const newformdata = {
      id: uuidv4().slice(0, 8),
      name,
      quantity,
      price,
      discount,
      tax,
      status: "manual",
    };

    if (sdata) {
      setSdata((olddata) => [...olddata, newformdata]);
    } else {
      setSdata(newformdata);
    }
    console.log(newformdata);
  };

  useEffect(() => {
    try {
      localStorage.setItem("items", JSON.stringify(sdata));
    } catch (error) {
      console.log(error.message);
    }
  }, [sdata]);
  return (
    <div>
      <Modal
        returnFocusAfterClose={false}
        size="lg"
        isOpen={mpopup}
        toggle={() => setMPopup(false)}
      >
        <ModalHeader toggle={() => setMPopup(false)}>
          Manual item create
        </ModalHeader>
        <ModalBody>
          <Row style={{ maxHeight: "30vh", overflow: "auto" }}>
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
                <tbody></tbody>
              </table>
            </Col>
          </Row>
          <Row>
            <Col>
              <form onSubmit={handleFormsubmit}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Product name"
                    name="name"
                    value={name}
                    onChange={handleFromData}
                    required
                  />
                  &nbsp;
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Quantity"
                    name="quantity"
                    value={quantity}
                    onChange={handleFromData}
                    required
                  />
                  &nbsp;
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Price"
                    name="price"
                    value={price}
                    onChange={handleFromData}
                    required
                  />
                  &nbsp;
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Discount"
                    name="discount"
                    value={discount}
                    onChange={handleFromData}
                  />
                  &nbsp;
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Tax"
                    name="tax"
                    value={tax}
                    onChange={handleFromData}
                  />
                  &nbsp;
                  <button
                    style={{
                      width: "15%",
                      background: "#727cf9",
                      color: "#fff",
                    }}
                    type="submit"
                    className="btn btn-sm"
                  >
                    <span>Create</span>
                  </button>
                </div>
              </form>
            </Col>
          </Row>
          <br />
        </ModalBody>
      </Modal>
      <button
        className="form-control mr-auto btn-info"
        style={{ height: "2rem" }}
        id="manual"
        ref={manualbtn}
        onClick={() => handleKeyDown("M")}
      >
        <span>
          <FaPlus /> Manual item create
        </span>
      </button>
    </div>
  );
};

export default ManualCreate;
