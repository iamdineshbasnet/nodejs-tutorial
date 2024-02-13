const express = require('express')

const router = express.Router()

const User = require('../../models/users')

// login 
router.post("/", async(req, res)=>{
  const {email, password} = req.body

  try {
    
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router