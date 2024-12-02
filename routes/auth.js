const express = require("express");
const { SignUp, Signin, resetPassword } = require("../controllers/auth");
const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", Signin);
router.post("/reset-password", resetPassword);

module.exports = router;
