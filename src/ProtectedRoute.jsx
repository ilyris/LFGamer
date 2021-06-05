import React from 'react';
import {Route, Redirect} from 'react-router-dom';


// pass in an object, with the Component as a value to 'component' then spread the rest of the object in.
// We also pass in our individual props we prop drilled.
export const ProtectedRoute = ({component: Component,  IsLoggedIn, ...restOfProps}) => {
    return(
    <Route {...restOfProps} render={props => (
        IsLoggedIn 
        ? <Component {...props} /> 
        : <Redirect to={{pathname:'/signin', state: {from: props.location} }} />
    )} />
    )
}