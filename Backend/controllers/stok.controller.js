const Stok = require("../models/stok.models");

const getAllStok = async (req, res) => {
  try {
    const stoks = await Stok.find();
    res.status(200).json(stoks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneStok = async (req, res) => {
  try {
    const stok = await Stok.findOne({ id: req.params.id });
    res.status(200).json({
      _id: stok._id,
      name: stok.name,
      id: stok.id,
      quantity: 1,
      qty: stok.quantity,
      price: stok.price,
      discount: stok.discount,
      tax: stok.tax,
    });
  } catch (error) {
    res.status(404).json({ message: "Data not Found" });
  }
};

const createStok = async (req, res) => {
  try {
    const stok = await Stok.findOne({ id: req.body.id });
    if (stok) {
      res
        .status(400)
        .json({ message: " Opps! it's already exist", data: stok });
    } else {
      const newStok = new Stok({
        name: req.body.name,
        id: req.body.id,
        quantity: Number(req.body.quantity),
        price: Number(req.body.price),
        discount: Number(req.body.discount),
        tax: Number(req.body.tax),
      });
      await newStok.save();
      res.status(201).json({ message: "Create Successfully" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateOneStok = async (req, res) => {
  try {
    const stok = await Stok.findOne({ id: req.params.id });
    if (stok) {
      stok.name = req.body.name || stok.name;
      stok.quantity = Number(req.body.quantity) || stok.quantity;
      stok.price = Number(req.body.price) || stok.price;
      stok.discount = Number(req.body.discount);
      stok.tax = Number(req.body.tax);
    } else {
      res.status(400).json({ message: "Samething Wrong !" });
    }

    await stok.save();
    res.status(200).json({message:"Update Successfully"});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateOneStokprint = async (req, res) => {
  try {
    const stok = await Stok.findOne({ id: req.params.id });

    stok.name = req.body.name || stok.name;
    stok.quantity =
      (req.body.quantity &&
        Number(stok.quantity) - Number(req.body.quantity)) ||
      stok.quantity;
    stok.price = Number(req.body.price) || stok.price;

    await stok.save();
    res.status(200).json(stok);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteOneStok = async (req, res) => {
  try {
    await Stok.deleteOne({ id: req.params.id });
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllStok,
  getOneStok,
  createStok,
  updateOneStok,
  updateOneStokprint,
  deleteOneStok,
};
