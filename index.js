const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./route')

const app = express()
const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json())
// app.use('/', routes)

app.get('/', (req, res)=>{
  res.send("Hello NodeMon")
})

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`)
})
