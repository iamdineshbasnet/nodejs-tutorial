require('dotenv').config(); 
require('./db')

const express = require('express')
const cors = require('cors')
const bodyParser  = require('body-parser')
const cookieParser = require('cookie-parser')

// Execute Express
const app = express()

// Define PORT
const PORT = process.env.PORT || 3000

//Middlewares
app.use(express.json()); 
app.use(cors()); 
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const task = require("./api/task")
const login = require('./api/login')
const signup = require('./api/signup')
const user = require('./api/users')
const refresh = require("./api/refresh")

app.use('/api/task', task)
app.use('/api/login', login)
app.use('/api/signup', signup)
app.use('/api/user', user)
app.use('/api/refresh', refresh)

app.listen(PORT, ()=>{
  console.log(`Listening to http://localhost:${PORT}/`)
})
