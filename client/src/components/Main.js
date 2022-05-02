import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './user/login';
import Signup from './user/signup';

import ProvideAuth from './authentication/ProvideAuth';
import CreateProject from './project/CreateProject';
import NavBar from './Navbar';
import PrivateRoute from './authentication/PrivateAuth';
import ProjectList from './project/ProjectList';
import ComponentList from './testComponent/ComponentList';
import Dashboard from './Dashboard';
import CreateComponent from './testComponent/CreateComponent';
import TestCaseList from './testCase/TestCaseList';
import CreateTestCase from './testCase/CreateTestCase';
import AdminAnalysisProject from './integration/AdminAnalysisProject';
import AdminAnalysisTestCase from './integration/AdminAnalysisTestCase';

const Main = () => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [authState, setAuthState] = useState(false);
    // const [token, setToken] = useState();

    useEffect(() => {
        fetchInitialStateForUser();
    }, []);

    const fetchInitialStateForUser = async () => {
        // const token = window.localStorage.getItem('token');
        const userObj = window.localStorage.getItem('user');
        const user = JSON.parse(userObj);
        if (user) {
            setAuthState(true);
            setUser(user);
            setLoading(false);
        }
        else {
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
    return (
        <div>
            {!loading && (
                <>

                    <ProvideAuth value={{ user, authState }}>
                        
                        <Router>
                        <NavBar />
                            <Routes>
                                <Route path="/Dashboard"
                                    element={<Dashboard />}
                                />
                                <Route path="/login"
                                    element={<Login />}
                                />
                                <Route path="/signup"
                                    element={<Signup />}
                                />
                                <Route path="project/:id"
                                    element={<PrivateRoute path="project/:id"
                                        element={<CreateProject />}
                                    />}
                                />
                                <Route path="project_list/manager/:manager_id"
                                    element={<PrivateRoute path="project_list/manager/:manager_id"
                                        element={<ProjectList />}
                                    />}
                                />
                                <Route path="component/:id"
                                    element={<PrivateRoute path="component/:id"
                                        element={<CreateComponent />}
                                    />}
                                />

                                <Route path="component_list/project/:project_id"
                                    element={<PrivateRoute path="component_list/project/:project_id"
                                        element={<ComponentList source={'project'} />}
                                    />}
                                />

                                <Route path="component_list/testlead/:testlead_id"
                                    element={<PrivateRoute path="component_list/testlead/:testlead_id"
                                        element={<ComponentList source={'testlead'} />}
                                    />}
                                />
                                <Route path="testCase/:id"
                                    element={<PrivateRoute path="testCase/:id"
                                        element={<CreateTestCase />}
                                    />}
                                />

                                <Route path="testCase_list/component/:component_id"
                                    element={<PrivateRoute path="testCase_list/component/:component_id"
                                        element={<TestCaseList source={'component'} />}
                                    />}
                                />

                                <Route path="testCase_list/tester/:tester_id"
                                    element={<PrivateRoute path="testCase_list/tester/:tester_id"
                                        element={<TestCaseList source={'tester'} />}
                                    />}
                                />

                                <Route path="admin/project/"
                                    element={<PrivateRoute path="admin/project/"
                                        element={<AdminAnalysisProject />}
                                    />}
                                />
                                <Route path="admin/testCase/"
                                    element={<PrivateRoute path="admin/testCase/"
                                        element={<AdminAnalysisTestCase />}
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
                </>
            )
            }
        </div>
    );
}

export default Main;