const express = require('express')

const router = express.Router()

const User = require('../../models/users')

router.post('/', async(req, res)=>{
  const {email, username, password, confirmPassword} = req.body
  try {
    const user = new User({email, username, password, confirmPassword})
    await user.save()
    res.status(201).send(user)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router