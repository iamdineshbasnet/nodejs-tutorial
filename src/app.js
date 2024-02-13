const express = require('express')
const cors = require('cors')
const bodyParser  = require('body-parser')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config(); 
require('./db')

// Execute Express
const app = express()

const task = require("./api/task")
const login = require('./api/login')
const signup = require('./api/signup')
const user = require('./api/users')


// Define PORT
const PORT = process.env.PORT || 3000



//Middlewares
app.use(express.json()); 
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000
};
app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});
app.use('/api/task', task)
app.use('/api/login', login)
app.use('/api/signup', signup)
app.use('/api/user', user)

app.listen(PORT, ()=>{
  console.log(`Listening to http://localhost:${PORT}/`)
})