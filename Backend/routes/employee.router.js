const {
  getAllEmployee,
  getOneEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee.controller");

const router = require("express").Router();

router.get("/all", getAllEmployee);
router.get("/:id", getOneEmployee);
router.post("/", createEmployee);
router.patch("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
