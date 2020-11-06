import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//import { getSessionCookie } from "./sessions";
import { Auth } from './auth';


export const ProtectedRoute = ( {component: Component} ) => {
    return (
        <Route
            render = {props => {
                if( Auth.getAuthState() ){
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect to={
                            {pathname: "/",
                            state: {
                                from: props.location
                            }
                        }}
                        />
                    );
                }
            }}
        />
    );
};