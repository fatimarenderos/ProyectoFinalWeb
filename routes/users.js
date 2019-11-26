var express = require("express");
var router = express.Router();
const PacientesController = require("../Controllers/PacientesController");

router.post("/insert", PacientesController.insert);
router.get("/:username", PacientesController.getOne);
router.get("/", PacientesController.getAll);
router.put("/:username", PacientesController.update);
router.delete("/:username", PacientesController.deleteOne);

module.exports = router;