import React from 'react'
import { Redirect } from 'react-router-dom'
import UserContext from '../context/UserContext'


function PrivateRoute({ children }) {
    const user = React.useContext(UserContext)
    return user.isLoggedIn ? children : <Redirect to="/login" />

}

export default PrivateRoute