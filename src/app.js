const express = require('express')
const cors = require('cors')
require('dotenv').config(); 
require('./db')

const task = require("./api/task")
const login = require('./api/login')
const signup = require('./api/signup')
const user = require('./api/users')

// Define PORT
const PORT = process.env.PORT || 3000

// Execute Express
const app = express()


//Middlewares
app.use(express.json()); 
app.use(cors()); 


app.use('/api/task', task)
app.use('/api/login', login)
app.use('/api/signup', signup)
app.use('/api/users', user)

app.listen(PORT, ()=>{
  console.log(`Listening to http://localhost:${PORT}/`)
})