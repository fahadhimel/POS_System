const mongoose = require("mongoose");

const sellSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  items:{
    type:String,
    required:true
  },
  tlat: {
    type: Number,
    required: true,
  },
  disd: {
    type:String,
  },
  payat: {
    type: Number,
    required: true,
  },
  cgeat: {
    type: Number,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("sell", sellSchema);