const mongoose = require("mongoose");

const stokSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  id: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  discount: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Stok", stokSchema);
