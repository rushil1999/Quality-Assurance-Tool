//SJSU CMPE 138 Spring 2022 TEAM3 

import React, {useContext} from 'react';
import { AuthContext } from './ProvideAuth';
import {Route, Navigate, useLocation} from 'react-router-dom';


const PrivateRoute = ({ path, element}) => {
    const contextValue = useContext(AuthContext);
    console.log(contextValue);
    // console.log(path, contextValue, element);
    const location = useLocation();
    if(contextValue.isAuthenticated){
      return element;
    }
    else{
      return <Navigate to="/login" state={{ from: location }} />;
    }
  }
  
  export default PrivateRoute;


  // return (
  //   <React.Fragment
  //   {...rest}
  //   render={
  //     ({ location }) => (
  //       contextValue.isAuthenticated
  //         ? (
  //           children
  //         ) : (
  //           <Navigate
  //             to={{
  //               pathname: '/login',
  //               state: { from: location }
  //             }}
  //           />
  //         ))
  //   }
  // />
  // );