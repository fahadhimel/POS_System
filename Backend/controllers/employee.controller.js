const { json } = require("express");
const Employee = require("../models/employee.models");

const getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({ id: req.params.id });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createEmployee = async (req, res) => {
  try {
    const newemployee = new Employee({
      name: req.body.name,
      phone: req.body.phone,
      ephone: req.body.ephone,
      email: req.body.email,
      parent: req.body.parent,
      pphone: req.body.pphone,
      address: req.body.address,
      bdate: req.body.bdate,
      gender: req.body.gender,
      designation: req.body.designation,
      salary: req.body.salary,
    });

    await newemployee.save();
    res.status(201).json({ message: "Employee Cteate Successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateEmployee = async (req, res) => {
  try {
    let employee = await Employee.findOne({ id: req.params.id });
    if (employee) {
      employee.name = req.body.name || employee.name;
      employee.phone = Number(req.body.phone) || employee.phone;
      employee.ephone = Number(req.body.ephone) || employee.ephone;
      employee.email = req.body.email || employee.email;
      employee.parent = req.body.parent || employee.parent;
      employee.pphone = Number(req.body.pphone) || employee.pphone;
      employee.address = req.body.address || employee.address;
      employee.bdate = req.body.bdate || employee.bdate;
      employee.gender = req.body.gender || employee.gender;
      employee.designation = req.body.designation || employee.designation;
      employee.salary = req.body.salary || employee.salary;
    }
    await employee.save();
    res.status(200).json({ message: "Update Successfully" });

    console.log(employee);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    await Employee.deleteOne({ id: req.params.id });
    res.status(200).json({ message: "Employee Delete Successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllEmployee,
  getOneEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
