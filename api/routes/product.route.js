var express = require("express");
var router = express.Router();
var controller = require('../controllers//product.controller');

router.get("/", controller.index );
router.get("/:id", controller.detail );
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
