const mongoose = require("mongoose");

const { v4: uuidv4 } = require("uuid");

const employeeSchema = mongoose.Schema({
  id: {
    type: String,
    default: uuidv4(),
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  ephone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
  parent: {
    type: String,
  },
  pphone: {
    type: Number,
  },
  address: {
    type: String,
    required: true,
  },
  bdate: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("employee", employeeSchema);
