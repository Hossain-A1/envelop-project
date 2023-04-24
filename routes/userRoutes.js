const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  findUser,
  getAllUsers,
} = require("../controllers/userControler");

// routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/find/:userId", findUser);
router.get("/", getAllUsers);

module.exports = router;
