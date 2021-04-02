const express = require("express");
const { signup } = require("../controllers/auth");
const {userSignupValidator} = require("../validator");
//index.js file automatically reads

const router = express.Router();


router.post("/signup", userSignupValidator,signup);

module.exports = router;
