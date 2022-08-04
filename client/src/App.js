import React, { useEffect, useState } from 'react'
import "./AppStyles.css"
import Login from './views/Login/Login'
import Main from './views/Main/Main'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

const App = () => {

    const [user, setUser] = useState({username: '', access_token : '', email: ''})

    useEffect(() => {
        if ( localStorage.getItem( 'email' ) !== undefined && localStorage.getItem( 'email' ) !== null ) {
            setUser( {
                email: localStorage.getItem( 'email' ),
                username: localStorage.getItem( 'username' ),
                access_token: localStorage.getItem( 'access_token' )
            } );
        }
    }, [])

    return (
        <Router>
            <Routes>
                <Route path='/' exact element={user.username !== '' ? <Navigate to='/Login' /> : <Navigate to='/Dashboard' />} />
                <Route path='/Login' element={user.username === '' ? <Login setUser={setUser} /> : <Navigate to='/Dashboard' />} />
                <Route path='/Dashboard' element={user.username !== '' ? <Main user={user} setUser={setUser} /> : <Navigate to='/Login' /> } />
            </Routes>
        </Router>
    )
}

export default App