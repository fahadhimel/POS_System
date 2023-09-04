 const {createSignup, login } = require("../controllers/signup.controller");

const router = require("express").Router();

router.post("/up", createSignup);
router.post("/login", login);

// router.post("/", createStok);
// router.get("/:id", getOneStok);
// router.patch("/:id", updateOneStok);
// router.delete("/:id", deleteOneStok);


module.exports = router;
