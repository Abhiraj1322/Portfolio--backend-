const express = require("express");
const router = express.Router();

const userController = require("./controller");

// /user
router.get("/", userController.getUser)

// /user/login
router.get("/login", userController.loginForm);

//login form submit
router.post("/login", userController.login);

// /user/register
router.get("/register", userController.registerForm);

//register form submit
router.post("/register", userController.register);

// /user/logout
router.get("/logout", userController.logout)

module.exports = router;