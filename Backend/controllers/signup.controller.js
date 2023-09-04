const Signup = require("../models/signup.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { v4: uuidv4 } = require("uuid");

/*const login = async (req, res) => {
  try {
    const login = await Signup.find({ phone: req.params.phone });
    if (login) {
      res.status(200).json({ message: "if",data:login[0].password });
    } else {
      res.status(200).json({ message: "else" });
    }
    //res.status(200).json(stoks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};*/
const login = async (req, res) => {
  try {
    Signup.find({ phone: req.body.phone })
      .exec()
      .then((login) => {
        if (!login) {
          return res.status(401).json({ message: "user not exist" });
        }
        bcrypt.compare(req.body.password, login[0].password, (err, result) => {
          if (!result) {
            return res.status(401).json({ message: "password not matching" });
          }
          if (result) {
            const token = jwt.sign(
              {
                name: `Fu${login[0].name}ck`,
                phone: `568${login[0].phone}91`,
              },
              "this is fahad himel",
              { expiresIn: "24h" }
            );
            res.status(200).json({
              message: `welcome ${login[0].name}`,
              token: token,
            });
          }
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*const createSignup = async (req, res) => {
  try {
    const newSignpu = new Signup({
      id: uuidv4(),
      name: req.body.name,
      phone: req.body.phone,
      password: req.body.password,
    });
    await newSignpu.save();
    res.status(201).json({ message: "Signup Successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};*/
const createSignup = async (req, res) => {
  const login = await Signup.find({ phone: req.body.phone });
  login && login.length > 0
    ? res.status(401).json({ message: "Already exist the phone number" })
    : bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        } else {
          const newSignpu = new Signup({
            id: uuidv4(),
            name: req.body.name,
            phone: req.body.phone,
            password: hash,
          });
          newSignpu
            .save()
            .then((result) => {
              res.status(200).json({message:"Signup successful"});
            })
            .catch((err) => {
              res.status(500).json({ message: err.message });
            });
        }
      });
};

module.exports = {
  createSignup,
  login,
};
