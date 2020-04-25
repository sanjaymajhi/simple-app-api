var express = require("express");
var router = express.Router();

const modelController = require("../controllers/modelController");

/* GET home page. */
router.get("/api/startupList", modelController.get_startup_list);
router.post("/api/addStartup", modelController.save_startup);

module.exports = router;
