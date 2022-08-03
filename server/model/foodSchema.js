const mongoose = require( 'mongoose' )

const FoodSchema = new mongoose.Schema( {
    email: {
        type: String,
        required: true
    },
    entries: {
        type: [],
        required: true
    }
} )

const Food = mongoose.model( 'Food', FoodSchema )

module.exports = Food