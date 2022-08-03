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

    const [user, setUser] = useState({username: '', accessToken : ''})

    useEffect(() => {
        if (localStorage.getItem('user') !== undefined) {
            setUser({username: localStorage.getItem('username'), accessToken: localStorage.getItem('access_token')});
        }
    }, [])

    return (
        <Router>
            <Routes>
                <Route path='/' exact element={user.username !== '' ? <Navigate to='/Login' /> : <Navigate to='/Dashboard' />} />
                <Route path='/Login' element={user.username === '' ? <Login /> : <Navigate to='/Dashboard' />} />
                <Route path='/Dashboard' element={user.username !== '' ? <Main /> : <Navigate to='/Login' /> } />
            </Routes>
        </Router>
    )
}

export default App