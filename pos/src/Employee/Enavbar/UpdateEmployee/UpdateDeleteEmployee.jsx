import React, { useState, useEffect, useRef } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { FaSearchPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UpdateDeleteEmployee = () => {
  const inputnameref = useRef(null);
  const spanref = useRef(null);
  const searchinputref = useRef(null);
  const [search, setSearch] = useState("");
  const [updateemployeepopup, setUpdateemployeepopup] = useState(false);
  const [gender, setGender] = useState("male");
  const [getemployeedata, setGetemployeedata] = useState([]);
  const [getemployeedatafilter, setGetemployeedatafilter] =
    useState([]);
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
  const [id, setid] = useState("");

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
    updateEmployee(newdata);
  };
  const updateEmployee = async (udata) => {
    try {
      const url = `http://127.0.0.1:3001/employee/${id}`;
      const header = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const response = await axios.patch(url, udata, { header });
      getEmployee();
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
      setGender("");
      setid("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    try {
      if (updateemployeepopup) {
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
        setTimeout(() => {
          getEmployee();
          spanref.current?.scrollIntoView();
          searchinputref.current.focus();
        }, 100);
      }
    } catch (error) {
      console.log(error);
    }
  }, [updateemployeepopup]);

  const getEmployee = async () => {
    try {
      const response = await axios(`http://127.0.0.1:3001/employee/All`);
      setGetemployeedata(response.data);
      setGetemployeedatafilter(response.data);
    } catch (error) {}
  };

  const handleUpdate = async (emp) => {
    try {
      const {
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
      } = emp;
      setFormdata({
        name,
        phone: "0" + phone,
        ephone: "0" + ephone,
        email,
        parent,
        pphone: "0" + pphone,
        address,
        bdate,
        designation,
        salary,
      });
      setGender(gender);
      setid(emp.id);
      inputnameref.current?.focus();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (Did) => {
    try {
      const url = `http://127.0.0.1:3001/employee/${Did}`;
      Swal.fire({
        title: "Are you sure?",
        text: `Shall I delete it?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          const response = await axios.delete(url);
          toast.success(response.data.message);
          getEmployee();
        }
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReset = () => {
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
  };

  useEffect(() => {
    handleSearchFilter();
  }, [search]);

  const handleSearchFilter = () => {
    try {
      let searchsmall = search.toLowerCase();
      const filterdata = getemployeedata?.filter((employee) => {
        const ename = employee.name.toLowerCase();
        return ename.startsWith(searchsmall);
      });
      setGetemployeedatafilter(filterdata);
      //getEmployee();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary btnstyle"
        onClick={() => setUpdateemployeepopup(true)}
      >
        Update & Delete Employee
      </button>
      <Modal
        className="modal1"
        returnFocusAfterClose={false}
        //fullscreen
        size="xl"
        isOpen={updateemployeepopup}
        //toggle={() => setNewProductspopup(false)}
      >
        <ModalHeader toggle={() => setUpdateemployeepopup(false)}>
          Update & Delete Employees
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
                        ref={inputnameref}
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
                  <div>
                    <button
                      style={{
                        width: "10%",
                        background: "red",
                        color: "#fff",
                        margin: "10px 5px",
                      }}
                      type="button"
                      className="btn btn-sm"
                      onClick={() => handleReset()}
                    >
                      Reset
                    </button>
                    <button
                      style={{
                        width: "88%",
                        background: "#727cf9",
                        color: "#fff",
                      }}
                      type="submit"
                      className="btn btn-sm"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
          &nbsp;
          <Row
            style={{
              height: "80vh",
              maxHeightF: "60vh",
              overflow: "auto",
              marginTop: "10px",
            }}
          >
            <Col>
              <table
                className="table boder shadow table-striped"
                style={{ borderRadius: "10px" }}
              >
                <thead className="thead-derk bg-info tmc">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">
                      <input
                        style={{ width: "12vw" }}
                        type="text"
                        className="form-control p-1"
                        placeholder="Search Name"
                        name="search"
                        ref={searchinputref}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </th>
                    <th scope="col">phone</th>
                    <th scope="col">address</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Update & Delete</th>
                  </tr>
                </thead>
                <tbody className="">
                  {getemployeedatafilter &&
                    getemployeedatafilter.map((emp, index) => {
                      return (
                        <tr key={emp._id}>
                          <td>{index + 1}</td>
                          {/* <td>{emp.id}</td> */}
                          <td>{emp.name}</td>
                          <td>{"0" + emp.phone}</td>
                          <td>{emp.address}</td>
                          <td>{emp.designation}</td>
                          <td>{emp.salary}</td>
                          <td className="">
                            <button
                              style={{ marginRight: "0px", color: "blue" }}
                              className="btn"
                              onClick={() => handleUpdate(emp)}
                              //ref={editbtn}
                            >
                              <FaSearchPlus />
                            </button>
                            <button
                              style={{ marginRight: "10px", color: "red" }}
                              className="btn"
                              onClick={() => handleDelete(emp.id)}
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
          <span ref={spanref} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default UpdateDeleteEmployee;
