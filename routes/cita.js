var express = require("express");
var router = express.Router();
const CitasController = require("../Controllers/CitasControllers");

router.post("/insert", CitasController.insert);
router.get("/:numCita", CitasController.getOne);
router.get("/", CitasController.getAll);
router.put("/:numCita", CitasController.update);

module.exports = router;