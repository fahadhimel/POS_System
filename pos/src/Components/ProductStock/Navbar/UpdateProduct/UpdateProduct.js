import React, { useState, useEffect, useRef } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { FaSearchPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const searchinput = useRef(null);
  const [updateProductspopup, setUpdateProductspopup] = useState(false);
  const handleUpdateProducts = () => {
    setUpdateProductspopup(true);
  };
  const [fromdata, setFromdata] = useState({
    name: "",
    quantity: "",
    price: "",
    discount: "",
    tax: "",
  });
  const { name, quantity, price, discount, tax } = fromdata;
  const [barcode, setBarcode] = useState({
    id: "",
    _id: "",
  });
  const { id, _id } = barcode;

  /************************************************************************* */
  const scrollrowref = useRef(null);
  const inputnameref = useRef(null);
  const [search, setSearch] = useState("");
  const [stokdata, setStokdata] = useState([]);
  const [fillterData, setFillterData] = useState(stokdata);
  /************************************************************************* */

  const handleFromData = (e) => {
    try {
      setFromdata({ ...fromdata, [e.target.name]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormsubmit = (e) => {
    try {
      e.preventDefault();
      const updatedata = {
        name,
        quantity,
        price,
        discount,
        tax,
      };
      handleAxiosUpdate(updatedata);
      setTimeout(() => {
        setFromdata({
          name: "",
          quantity: "",
          price: "",
          discount: "",
          tax: "",
        });
        setBarcode({
          id: "",
          _id: "",
        });
        searchinput.current.focus();
      }, 150);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAxiosUpdate = async (updatedata) => {
    try {
      const url = `http://127.0.0.1:3001/stok/${id}`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const responsepatch = await axios.patch(url, updatedata, { headers });
      toast.success(responsepatch.data.message);
      getStokData();
      setSearch("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (fid, fname) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: `$Shall I delete it?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          const response = await axios.delete(
            `http://127.0.0.1:3001/stok/${fid}`
          );
          if (response.status == 200) {
            const removefilter =
              stokdata &&
              stokdata.filter((fil) => {
                const filter = fil.id !== fid;
                return filter;
              });
            setFillterData(removefilter);
            setStokdata(removefilter);
            toast.success(response.data.message);
          }
        }
      });
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  //******************************************************** */
  useEffect(() => {
    try {
      if (updateProductspopup) {
        getStokData();
        setTimeout(() => {
          searchinput.current.focus();
        }, 200);
      }
    } catch (error) {
      console.log(error);
    }
  }, [updateProductspopup]);

  const getStokData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3001/stok/all`);
      setStokdata(response.data);
      setFillterData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      if (updateProductspopup) {
        setTimeout(() => {
          scrollrowref.current?.scrollIntoView();
        }, 100);
      }
    } catch (error) {
      console.log(error);
    }
  }, [updateProductspopup | search]);

  useEffect(() => {
    try {
      let svalue = search.toLowerCase();
      const filterSearch =
        stokdata &&
        stokdata.filter((fil) => {
          const filtername = fil.name.toLowerCase();
          const filterid = fil.id.toLowerCase();
          return filtername.startsWith(svalue) || filterid.startsWith(svalue);
        });
      setFillterData(filterSearch);
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  const handleUpdate = (stok) => {
    try {
      setFromdata({
        name: stok.name,
        quantity: stok.quantity,
        price: stok.price,
        discount: stok.discount,
        tax: stok.tax,
      });
      setBarcode({
        id: stok.id,
        _id: stok._id,
      });
      inputnameref.current.focus();
    } catch (error) {
      console.log(error);
    }
  };
  /************************************************************ */

  return (
    <>
      <button
        type="button"
        className="btn btn-primary btnstyle"
        onClick={() => handleUpdateProducts()}
      >
        Update & Delete Products
      </button>
      <Modal
        className="modal1"
        returnFocusAfterClose={false}
        //fullscreen
        size="xl"
        isOpen={updateProductspopup}
        //toggle={() => setNewProductspopup(false)}
      >
        <ModalHeader toggle={() => setUpdateProductspopup(false)}>
          Update Product
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
                      Product name :
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Product name"
                        name="name"
                        ref={inputnameref}
                        value={name}
                        onChange={handleFromData}
                        required
                      />
                    </div>
                    <div className="col">
                      Quantity :
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

                  <div className="row">
                    <div className="col">
                      Price :
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
                      Discount :
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

                  <div className="row">
                    <div className="col">
                      Barcode :
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Custom Code"
                        name="customcode"
                        value={id}
                        onChange={(e) => setBarcode({ id: e.target.value })}
                        disabled
                      />
                    </div>
                    <div className="col">
                      Tax :
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
                      {id || "524Dfg"}
                    </p>
                    <p style={{ textAlign: "center" }}>{id || "524Dfg"}</p>
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
          <Row
            style={{
              height: "80vh",
              maxHeightF: "60vh",
              overflow: "auto",
              marginTop: "10px",
            }}
          >
            <Col>
              <table className="table boder shadow table-striped">
                <thead className="thead-derk bg-info tmc">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">
                      <input
                        style={{ width: "12vw" }}
                        type="text"
                        className="form-control p-1"
                        placeholder="Search Name or ID"
                        name="search"
                        ref={searchinput}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </th>

                    <th scope="col">ID</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Tax</th>
                    <th scope="col">Update</th>
                  </tr>
                </thead>
                <tbody className="">
                  {fillterData &&
                    fillterData.map((stok, index) => {
                      return (
                        <tr key={stok._id}>
                          <td>{index + 1}</td>
                          <td>{stok.name}</td>
                          <td>{stok.id}</td>
                          <td>{stok.quantity}</td>
                          <td>{stok.price}</td>
                          <td>{stok.discount || 0}</td>
                          <td>{stok.tax || 0}</td>
                          <td className="">
                            <button
                              style={{ marginRight: "0px", color: "blue" }}
                              className="btn"
                              onClick={() => handleUpdate(stok)}
                              // ref={editbtn}
                            >
                              <FaSearchPlus />
                            </button>
                            <button
                              style={{ marginRight: "10px", color: "red" }}
                              className="btn"
                              onClick={() => handleDelete(stok.id, stok.name)}
                              // ref={editbtn}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </Col>
          </Row>
          <span ref={scrollrowref} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default UpdateProduct;
