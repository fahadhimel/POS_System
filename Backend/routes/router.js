const mainRouter = require("express").Router();
//import all Router
const signupRouter = require("./signup.router");
const stokRouter = require("./stok.router");
const sellRouter = require("./sell.router");
const employeeRouter = require("./employee.router");

//Use All Route
mainRouter.use("/sign", signupRouter);
mainRouter.use("/stok", stokRouter);
mainRouter.use("/sell", sellRouter);
mainRouter.use("/employee", employeeRouter);

module.exports = mainRouter;
