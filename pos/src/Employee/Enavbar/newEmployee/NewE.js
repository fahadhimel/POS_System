import React, { useState } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import axios from "axios";
//import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const NewE = () => {
  const [newemployeepopup, setNewemployeepopup] = useState(false);
  const [gender, setGender] = useState("male");
  const [formdata, setFormdata] = useState({
    name: "",
    phone: "",
    ephone: "",
    email: "",
    parent: "",
    pphone: "",
    address: "",
    bdate: "",
    designation: "",
    salary: "",
  });
  const {
    name,
    phone,
    ephone,
    email,
    parent,
    pphone,
    address,
    bdate,
    designation,
    salary,
  } = formdata;

  const handleFromData = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleFormsubmit = (e) => {
    e.preventDefault();
    const newdata = {
      name,
      phone,
      ephone,
      email,
      parent,
      pphone,
      address,
      bdate,
      gender,
      designation,
      salary,
    };
    sunmitNewEmployee(newdata);
  };

  const sunmitNewEmployee = async (newdata) => {
    try {
      const url = `http://127.0.0.1:3001/employee/`;
      const header = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const response = await axios.post(url, newdata, { header });
      toast.success(response.data.message);
      setFormdata({
        name: "",
        phone: "",
        ephone: "",
        email: "",
        parent: "",
        pphone: "",
        address: "",
        bdate: "",
        designation: "",
        salary: "",
      });
      setGender("male");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary btnstyle"
        onClick={() => setNewemployeepopup(true)}
      >
        Add new Employee
      </button>
      <Modal
        className="modal1"
        returnFocusAfterClose={false}
        //fullscreen
        size="xl"
        isOpen={newemployeepopup}
        //toggle={() => setNewProductspopup(false)}
      >
        <ModalHeader toggle={() => setNewemployeepopup(false)}>
          New Employee
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col //sm={7}
            >
              <div>
                <form
                  className="p-2 shadow"
                  onSubmit={handleFormsubmit}
                  style={{ borderRadius: "5px" }}
                >
                  <div className="row">
                    <div className="col">
                      <label htmlFor="name">
                        Name<span style={{ color: "red" }}>*</span> :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        //placeholder="name"
                        name="name"
                        id="name"
                        value={name}
                        onChange={handleFromData}
                        required
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="phone">
                        Phone<span style={{ color: "red" }}>*</span> :
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        //placeholder="phone"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={handleFromData}
                        required
                      />
                    </div>
                  </div>

                  <div className="row pt-2">
                    <div className="col">
                      <label htmlFor="ephone">
                        Emergency phone<span style={{ color: "red" }}>*</span> :
                      </label>

                      <input
                        type="number"
                        className="form-control"
                        //placeholder="phone"
                        id="ephone"
                        name="ephone"
                        value={ephone}
                        onChange={handleFromData}
                        required
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="email">Email :</label>
                      <input
                        type="text"
                        className="form-control"
                        //placeholder="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleFromData}
                      />
                    </div>
                  </div>

                  <div className="row pt-2">
                    <div className="col">
                      <label htmlFor="parent">Parent name :</label>
                      <input
                        type="text"
                        className="form-control"
                        //placeholder="name"
                        id="parent"
                        name="parent"
                        value={parent}
                        onChange={handleFromData}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="pphone">Parent phone :</label>
                      <input
                        type="number"
                        className="form-control"
                        //placeholder="phone"
                        id="pphone"
                        name="pphone"
                        value={pphone}
                        onChange={handleFromData}
                      />
                    </div>
                  </div>

                  <div className="row pt-2">
                    <div className="col">
                      <label htmlFor="address">
                        Address<span style={{ color: "red" }}>*</span> :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Village, District, Division"
                        id="address"
                        name="address"
                        value={address}
                        onChange={handleFromData}
                        required
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="bdate">
                        Date of birth<span style={{ color: "red" }}>*</span> :
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        //placeholder="name"
                        id="bdate"
                        name="bdate"
                        value={bdate}
                        onChange={handleFromData}
                        required
                      />
                    </div>
                  </div>

                  <div className="row pt-2">
                    <div className="col d-flex">
                      &nbsp;&nbsp;
                      <label htmlFor="radioall">
                        Gender<span style={{ color: "red" }}>*</span> :
                      </label>{" "}
                      &nbsp;&nbsp;
                      <div className="d-flex" id="radioall">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="male"
                            onChange={(e) => setGender(e.target.value)}
                            checked={gender === "male"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                          >
                            Male
                          </label>
                        </div>
                        &nbsp;&nbsp;
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios2"
                            value="female"
                            onChange={(e) => setGender(e.target.value)}
                            checked={gender === "female"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios2"
                          >
                            Female
                          </label>
                        </div>
                        &nbsp;&nbsp;
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios3"
                            value="others"
                            onChange={(e) => setGender(e.target.value)}
                            checked={gender === "others"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios3"
                          >
                            Others
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col">
                      <label htmlFor="designation">
                        Designation<span style={{ color: "red" }}>*</span> :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        //placeholder="Designation"
                        id="designation"
                        name="designation"
                        value={designation}
                        onChange={handleFromData}
                        required
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="salary">
                        Salary<span style={{ color: "red" }}>*</span> :
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        //placeholder="Salary"
                        id="salary"
                        name="salary"
                        value={salary}
                        onChange={handleFromData}
                        required
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
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default NewE;
