// Imports
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import * as moment from 'moment';

// Local Import

const LoggedIn = ({ navigation }, defaultState) => {
    const [loggedIn, setLoggedIn] = useState(defaultState)


    const loginStatus = () => {
        const tokenString = localStorage.getItem("token");
        if (tokenString) {
            const token = JSON.parse(tokenString);
            const decodedAccessToken = jwtDecode(token.access_token);
            if (moment.unix(decodedAccessToken.exp).toDate() > new Date ()) { setLoggedIn(true); }
            else { setLoggedIn(false); }
        }
    }

    useEffect(() => {
        loginStatus();
        if (!loggedIn){ navigation.navigate("LoginScreen"); }
    }, []);
}

export default LoggedIn;