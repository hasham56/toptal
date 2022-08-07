import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import Login from './views/Login/Login'
import Main from './views/Main/Main'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { signInUser } from './redux/auth/Actions'
import PageLoader from './Loaders/PageLoader'
import axios from 'axios'
import "./AppStyles.css"

const App = () => {
    const { authenticated } = useSelector( state => state.auth )
    
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const cookies = new Cookies()

    useEffect(() => {
        const token = cookies.get( 'token' )
        if ( token !== undefined ) {
            setLoading(true)
            axios
                .get( 'http://localhost:3001/verifyAuth', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                .then( ( res ) => {
                    const user = res.data.user
                    dispatch( signInUser( {
                        authenticated: true,
                        currentUser: user,
                        token
                    } ) )
                    setLoading(false)
                } )
                .catch( ( err ) => console.log( err ) )
        }
    }, [])

    return loading ? <PageLoader /> : <Router>
            <Routes>
                <Route path='/' exact element={authenticated ? <Navigate to='/Login' /> : <Navigate to='/Dashboard' />} />
                <Route path='/Login' element={!authenticated ? <Login /> : <Navigate to='/Dashboard' />} />
                <Route path='/Dashboard' element={authenticated ? <Main /> : <Navigate to='/Login' /> } />
            </Routes>
        </Router>
}

export default App