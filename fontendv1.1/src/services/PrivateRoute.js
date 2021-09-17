import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        JSON.parse(localStorage.getItem('userConnected'))
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/connexion', state: { from: props.location } }} />
    )} />
)