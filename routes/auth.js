const express = require("express");
const { signup } = require("../controllers/auth");
// const validator = require("../validator");
//index.js file automatically reads

const router = express.Router();


router.post("/signup", signup);

module.exports = router;
