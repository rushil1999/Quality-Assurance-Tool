//SJSU CMPE 138 Spring 2022 TEAM3 

import React, {useState, useEffect, createContext} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


export const AuthContext =  createContext();

const ProvideAuth = props => {
    // console.log('Called', props);
    const [user, setUser] = useState(props.value.user);
    const [authState, setAuthState] = useState(props.value.authState);
    // const [token, setToken] = useState(props.value.token);

    // const getAuthentication = async () => {
    //     console.log('App Component called');
    //     const token = window.localStorage.getItem('token');
    //     const userObj = window.localStorage.getItem('user');
    //     const user = JSON.parse(userObj);
    //     if(token){
    //         setLoading(true);
    //         const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/user/verifyToken/${token}`);
    //         setAuthState(response.state === 200);
    //         setUser(user);
    //         setLoading(false);
             
    //     }
    //     else{
    //         setAuthState(false);
    //     }
    // }

    const updateLocalStorage = (user, token) => {
        // console.log('Updating Local Storage', token, user);
        // window.localStorage.setItem('token', token);
        window.localStorage.setItem('user', JSON.stringify(user));
    }

    const logout = () => {
        window.localStorage.removeItem('user');
        setAuthState(false);
        // navigate('/login');
    }

    useEffect(()=>{
        // getAuthentication();
    }, []);


    return (
        <AuthContext.Provider value={{isAuthenticated: authState, user, setUser, setAuthState, updateLocalStorage, logout}}>
            {props.children}
        </AuthContext.Provider>
    );
}


export default ProvideAuth;