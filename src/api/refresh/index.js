const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
router.post("/", (req, res)=>{
  try {
    const refreshToken = req.body.token
    if (refreshToken == null) {
      return res.status(401).send("No refresh token provided!");
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).send("Could not Verify Refresh Token");
  
      const token = jwt.sign({email: user.email, id: user.id}, process.env.JWT_SECRET, { expiresIn: "1h" })
      res.status(201).json({ accessToken: token });
    });
  } catch (error) {
    res.status(500).send(error)
  }   
})

module.exports = router