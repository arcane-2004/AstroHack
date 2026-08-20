const express = require("express");
const {authenticate} = require("../middleware/authMiddleware");

const {getNavamsaDetails} = require("../controllers/navamasyaChart");
const {getPlanetExtendedDetails} = require("../controllers/planetExtendedServiceController");
const {generateTodayPredict, getTodayPredict} = require("../controllers/getTodayPredict");
const router = express.Router();

router.post("/navamsa", getNavamsaDetails);
router.post("/planetExtended", getPlanetExtendedDetails);
router.post("/todayPredict",authenticate, generateTodayPredict);
router.get("/get/todayPredict",authenticate, getTodayPredict);
module.exports = router;