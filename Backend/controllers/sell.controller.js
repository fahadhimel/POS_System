const sell = require("../models/sell.models");

/*const getAllStok = async (req, res) => {
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
    res
      .status(200)
      .json({ _id: stok._id, name: stok.name, id: stok.id, quantity: 1,price:stok.price });
  } catch (error) {
    res.status(404).send({message:'Data not Found'});
  }
};*/

const createsell = async (req, res) => {
  try {
    const stok = await sell.findOne({ id: req.body.id });
    if (stok) {
      res
        .status(400)
        .json({ message: " Opps! it's already exist", data: stok });
    } else {
      const newsell = new sell({
        id: req.body.id,
        items:req.body.items,
        tlat: Number(req.body.tlat),
        disd: req.body.disd,
        payat: Number(req.body.payat),
        cgeat: Number(req.body.cgeat),
      });

    //   console.log("------id"+req.body.id,);
    //   console.log("items"+req.body.items);
    //   console.log("tlat"+Number(req.body.tlat));
    //   console.log("disd"+req.body.disd);
    //   console.log("payat"+Number(req.body.payat));
    //   console.log("cgeat"+Number(req.body.cgeat),);
      await newsell.save();
      res.status(201).json({message:"Sell Successfully"});
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
    //getAllStok,
    //getOneStok,
    createsell,
    //updateOneStok,
    //deleteOneStok,
  };