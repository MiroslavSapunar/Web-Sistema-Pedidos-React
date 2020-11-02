import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getSessionCookie } from "../sessions";


export const ProtectedRoute = ( {component: Component} ) => {
    return (
        <Route
            render = {props => {
                if( (getSessionCookie()) !== null  ){
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect to={
                            {pathname: "/403",
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