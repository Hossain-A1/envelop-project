const express = require("express")
const router = express.Router()

// routes
router.post("/register",(req,res)=>{
  res.json({message: "Register"})
})

module.exports = router