const { createsell } = require("../controllers/sell.controller");

const router = require("express").Router();

//router.get("/all", getAllStok);
router.post("/", createsell);
//router.get("/:id", getOneStok);
//router.patch("/:id", updateOneStok);
//router.delete("/:id", deleteOneStok);


module.exports = router;
