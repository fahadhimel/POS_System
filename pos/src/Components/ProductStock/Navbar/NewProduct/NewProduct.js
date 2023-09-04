import React, { useEffect, useState, useRef } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";



const NewProduct = () => {
  const customref = useRef(null);
  const [newProductspopup, setNewProductspopup] = useState(false);
  const handlenewProducts = () => {
    setNewProductspopup(true);
  };
  const [fromdata, setFromdata] = useState({
    name: "",
    quantity: "",
    price: "",
    discount: "",
    tax: "",
  });
  const { name, quantity, price, discount, tax } = fromdata;
  const [generatebarcode, setGeneratebarcode] = useState(true);
  const [customcode, setCustomcode] = useState("");
  useEffect(() => {
    try {
      if (generatebarcode !== true) customref.current.focus();
    } catch (error) {
      console.log(error);
    }
  }, [generatebarcode]);
  const handleFromData = (e) => {
    try {
      setFromdata({ ...fromdata, [e.target.name]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormsubmit = async (e) => {
    try {
      e.preventDefault();
      const newproduct = {
        name,
        quantity,
        price,
        discount: discount || 0,
        tax: tax || 0,
        id: generatebarcode ? uuidv4().slice(0, 6) : customcode,
      };

      if (customcode.length >= 4 || generatebarcode) {
        //console.log(newproduct);
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
        };
        const responsePost = await axios.post(
          `http://127.0.0.1:3001/stok`,
          newproduct,
          { headers }
        );
        toast.success(responsePost.data.message);

        setFromdata({
          name: "",
          quantity: "",
          price: "",
          discount: "",
          tax: "",
        });
        customcode && setCustomcode("");
      } else {
        console.log("customcode length is low");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary btnstyle"
        onClick={() => handlenewProducts()}
      >
        Add new Products
      </button>
      <Modal
        className="modal1"
        returnFocusAfterClose={false}
        //fullscreen
        size="xl"
        isOpen={newProductspopup}
        //toggle={() => setNewProductspopup(false)}
      >
        <ModalHeader toggle={() => setNewProductspopup(false)}>
          Add new Products
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={7}>
              <div>
                <form
                  className="p-2 shadow"
                  onSubmit={handleFormsubmit}
                  style={{ borderRadius: "5px" }}
                >
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Product name"
                        name="name"
                        value={name}
                        onChange={handleFromData}
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Quantity"
                        name="quantity"
                        value={quantity}
                        onChange={handleFromData}
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        placeholder="Price"
                        value={price}
                        onChange={handleFromData}
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        name="discount"
                        placeholder="Discount"
                        value={discount}
                        onChange={handleFromData}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck1"
                          checked={generatebarcode}
                          onClick={() => setGeneratebarcode(!generatebarcode)}
                          readOnly
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gridCheck1"
                        >
                          Generate barcode &nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or Custom :
                        </label>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Custom Code"
                        name="customcode"
                        value={generatebarcode !== false ? "" : customcode}
                        onChange={(e) => setCustomcode(e.target.value)}
                        disabled={generatebarcode !== false}
                        ref={customref}
                      />
                    </div>
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        name="tax"
                        placeholder="Tax"
                        value={tax}
                        onChange={handleFromData}
                      />
                    </div>
                  </div>
                  <br />
                  <button
                    style={{ width: "100%", background: "#727cf9" }}
                    type="submit"
                    className="btn btn-sm"
                  >
                    submit
                  </button>
                </form>
              </div>
            </Col>
            <Col lg={5}>
              <div className=" p-2 d-block">
                <div
                  className="d-flex justify-content-around"
                  style={{ height: "21vh" }}
                >
                  <div
                    className="shadow justify-content-center "
                    style={{
                      lineHeight: ".9",
                      alignItems: "center",
                      padding: "10px 30px",
                      marginBottom: "5px",
                      borderRadius: "5px",
                      overflow: "auto",
                    }}
                  >
                    <h4 style={{ textAlign: "center" }}>{name || "Name"}</h4>
                    <p
                      style={{
                        fontFamily: "'Libre Barcode 39'",
                        fontSize: "60px",
                        height: "3vh",
                      }}
                    >
                      {customcode || "524Dfg"}
                    </p>
                    <p style={{ textAlign: "center" }}>
                      {customcode || "524Dfg"}
                    </p>
                  </div>
                </div>
                <div
                  className="d-flex p-4 justify-content-around shadow"
                  style={{ borderRadius: "5px" }}
                >
                  <div>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Barcode quantity"
                    />
                  </div>
                  <div>
                    <button type="button" className="btn btn-primary btn-sm">
                      Print barcode
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default NewProduct;
