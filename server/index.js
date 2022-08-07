require( 'dotenv' ).config()

const express = require( 'express' )
const app = express()
const bcrypt = require( 'bcrypt' )
const jwt = require( 'jsonwebtoken' )
const cors = require( 'cors' )

// Connection
require( './db/conn' )

const PORT = process.env.PORT

const User = require( './model/userSchema' )
const Food = require( './model/foodSchema' )

app.use( express.json() )
app.use( cors( {
    origin: '*'
} ) )
// console.log(require('crypto').randomButes(64).toString('hex'))

app.post( '/register', async ( req, res ) => {
    // Register User
    const hashedPassword = await bcrypt.hash(
        req.body.password, 10
    )
    console.log( hashedPassword )
    const username = req.body.username.toLowerCase()
    const email = req.body.email.toLowerCase()
    const role = 'user'
    const user = {
        username,
        password: hashedPassword,
        email,
        role
    }

    User.findOne( {
            email: user.email
        } )
        .then(
            ( userExist ) => {
                if ( userExist ) return res.status( 422 ).json( {
                    error: 'User already exists!'
                } )
                const newUser = new User( user )
                newUser.save().then( () => {
                    res.status( 200 ).send( 'User successfully registered!' )
                } ).catch( err => res.status( 500 ).send( "User coudn't register!" ) )
            } ).catch( err => res.status( 500 ).send( "Database connection failed!" ) )
} )

app.post( '/login', async ( req, res ) => {
    // Authenticate Login
    try {
        const email = req.body.email.toLowerCase()
        const password = req.body.password

        if ( !email || !password ) return res.status( 400 ).json( {
            error: 'User data missing!'
        } )

        // Get from db
        const user = await User.findOne( {
            email
        } )

        if ( user == null ) return res.status( 400 ).send( "User not found!" )

        let check = await bcrypt.compare(
            password, user.password
        )
        if ( check ) {
            // Set Token
            const access_token = jwt.sign( user.email, process.env.ACCESS_SECRET )

            res.json( {
                message: 'Login successful!',
                access_token,
                username: user.username
            } )
        } else {
            res.send( 'Wrong password!' )
        }
    } catch ( error ) {
        console.log( error )
        res.status( 500 ).send( "User coudn't login!" )
    }
} )

app.get( '/foods', authenticateToken, async ( req, res ) => {
    const email = req.query.email

    if ( email !== null || email !== undefined || email !== '' ) {
        const food = await Food.findOne( {
            email
        } )

        if ( food == null ) return res.json( {
            message: 'User authentication successful!',
            result: null
        } )

        return res.json( {
            message: 'User authentication successful!',
            result: food
        } )
    }
    Food.find()
        .then(
            result => res.json( {
                message: 'User authentication successful!',
                result
            } ) )
        .catch( err => res.status( 400 ).send( "Error in database!" ) )
} )

app.post( '/foods', authenticateToken, ( req, res ) => {
    try {
        const {
            email,
            entries
        } = req.body

        // Pushing to Database
        const newFood = new Food( {
            email: email.toLowerCase(),
            entries
        } )
        newFood.save().then( () => {
            res.status( 200 ).send( 'Food saved successfully!' )
        } ).catch( err => res.status( 500 ).send( "Food counln't save!" ) )
    } catch ( error ) {
        console.log( error )
    }
} )

app.get( '/verifyAuth', authenticateToken, ( req, res ) => {

    res.json( {
        message: 'User authentication successful!',
        email: req.email
    } )
} )

function authenticateToken( req, res, next ) {
    const authHeader = req.headers[ 'authorization' ]
    const token = authHeader && authHeader.split( ' ' )[ 1 ]

    if ( token == null ) return res.status( 401 ).send( 'Login required!' )

    jwt.verify( token, process.env.ACCESS_SECRET, ( err, email ) => {
        if ( err ) return res.status( 403 ).send( 'Wrong authentication!' )
        req.email = email
        next()
    } )
}

app.listen( PORT, '0.0.0.0' )