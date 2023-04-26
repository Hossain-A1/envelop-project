const express = require("express")
const {
  createChat,
  findAllChat,
  findSingleChat,
} = require("../controllers/chatControler")
// router
const router = express.Router()

// routes
router.post("/", createChat)
router.get("/:userId", findAllChat)
router.get("/find/:firstId/:secondId",findSingleChat)

module.exports = router;