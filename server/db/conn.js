const mongoose = require('mongoose')

const DB = process.env.DATABASE

mongoose.connect( DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} ).then( res => {
    console.log('Connection successful!')
} ).catch( err => console.log( err ) )