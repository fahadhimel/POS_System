const { getAllStok, getOneStok, createStok,updateOneStok, updateOneStokprint, deleteOneStok } = require("../controllers/stok.controller");

const router = require("express").Router();

router.get("/all", getAllStok);
router.post("/", createStok);
router.get("/:id", getOneStok);
router.patch("/:id", updateOneStok);
router.patch("/print/:id", updateOneStokprint);
router.delete("/:id", deleteOneStok);


module.exports = router;
