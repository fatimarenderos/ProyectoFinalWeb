var express = require("express");
var router = express.Router();
const DoctoresController = require("../Controllers/DoctoresController");

router.post("/insert", DoctoresController.insert);
router.get("/:usernameDoc", DoctoresController.getOne);
router.get("/", DoctoresController.getAll);
router.put("/:usernameDoc", DoctoresController.update);
router.delete("/:usernameDoc", DoctoresController.deleteOne);

module.exports = router;