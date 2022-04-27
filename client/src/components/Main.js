import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Login from './user/login';
import Signup from './user/signup';
// import NavBar from './Navbar.js';
// import Profile from './user/profile';
// import Pricing from './user/pricing';
// import SearchCar from './ride/BookRide';
// import AddCar from './car/AddCar';
// import Dashboard from './Dashboard';
import ProvideAuth from './authentication/ProvideAuth';
import CreateProject from './project/CreateProject';
// import CarList from './car/CarList';
// import RideList from './ride/RideList';
import PrivateRoute from './authentication/PrivateAuth';
// import AdminAnalysis from './integration/AdminAnalysis';
// import { BACKEND_URL } from '../services/constants';
// import { BACKEND_PORT } from '../services/constants';

const Main = () => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [authState, setAuthState] = useState(false);
    // const [token, setToken] = useState();

    useEffect(()=>{
        fetchInitialStateForUser();
    }, []);

    const fetchInitialStateForUser = async () => {
        // const token = window.localStorage.getItem('token');
        const userObj = window.localStorage.getItem('user');
        const user = JSON.parse(userObj);
        if(user){
          setAuthState(true);
          setUser(user);
          setLoading(false);
        }
        else{
          setAuthState(false);
          setLoading(false);
        }
        // if(token && token !== undefined){
        //     console.log('TOKEN', token);
        //     setLoading(true);
        //     const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/user/verifyToken/${token}`);
        //     console.log(response);
        //     if(response.state === 200){
        //         setAuthState(response.state === 200);
        //         setUser(user);
        //         setToken(token);
        //         setLoading(false);
        //     }
        //     else{
        //         // history.push('/login');
        //         setAuthState(false);
        //         setLoading(false);
        //     }
        // }
        // else{
        //     console.log('herer');
        //     // history.push('/login');
        //     setAuthState(false);
        //     setLoading(false);
        // }
    }
    return(
        <div>
            {!loading && (
                <ProvideAuth value={{user, authState}}>
                    
                    <Router>
                      <Routes>
                        {/* <Route path="/">
                            <NavBar></NavBar>
                        </Route> */}
                        <Route path="/login"
                          element = {<Login/>}
                        />
                        <Route path="/signup"
                          element = {<Signup/>}
                        />
                        <Route path="project/:id"
                            element={<PrivateRoute path="project/:id" 
                                element = {<CreateProject/>}
                            />}
                        />
                        
                        {/*
                        <PrivateRoute path="/pricing">
                            <Pricing></Pricing>
                        </PrivateRoute>
                        
                        <PrivateRoute path="/searchCar">
                            <SearchCar></SearchCar>
                        </PrivateRoute>
                        
                        <PrivateRoute path="/AddCar">
                                <AddCar></AddCar>
                        </PrivateRoute>
                        
                        <PrivateRoute path="/CarList">
                                <CarList persona={'owner'}/>
                        </PrivateRoute>
                        <PrivateRoute path="/RideList">
                                <RideList/>
                        </PrivateRoute>
                        <PrivateRoute path="/Dashboard">
                            <Dashboard></Dashboard>
                        </PrivateRoute>
                        <PrivateRoute path="/AdminAnalysis">
                            <AdminAnalysis/>
                        </PrivateRoute> */}
                        </Routes>
                    </Router>
                </ProvideAuth>
            )
            }
            </div>
    );
}

export default Main;