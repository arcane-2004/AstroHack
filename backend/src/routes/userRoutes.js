const express = require("express");

const {createUserWithAstrologyProfile, loginUser,} = require("../controllers/userController");

const router = express.Router();

router.post("/register", createUserWithAstrologyProfile);
router.post("/login", loginUser)

module.exports = router;