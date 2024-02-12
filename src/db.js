const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://iamdineshbasnet:L7Qf6TDnMzMNuQhd@cluster0.yidycws.mongodb.net/?retryWrites=true&w=majority', {userNewUrlParser: true})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection errror'))

db.once('open', function(){
  console.log('Database connected successfully!')
})
