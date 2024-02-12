const express = require('express')

const api = require('./api')

const PORT = process.env.PORT || 3000

const app = express()

app.get('/', (req, res)=>{
  res.json({
    message: "app.js"
  })
})

app.use('/api', api)

app.listen(PORT, ()=>{
  console.log(`Listening to http://localhost:${PORT}`)
})