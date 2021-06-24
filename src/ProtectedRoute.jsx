import React from 'react';
import {Route, Redirect, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

// pass in an object, with the Component as a value to 'component' then spread the rest of the object in.
// We also pass in our individual props we prop drilled.
export const ProtectedRoute = ({component: Component, ...restOfProps}) => {
    
    const location = useLocation();
    const dispatch = useDispatch();
    
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if(token !== null) {
        localStorage.setItem('token', token)
        dispatch({type: 'IS_LOGGED_IN', payload: true})
    }
    const isLoggedIn = useSelector(state => state.root.isLoggedIn);

    return(
    <Route {...restOfProps} render={props => (
        isLoggedIn 
        ? <Component {...restOfProps}/> 
        : <Redirect to={{pathname:'/', state: {from: props.location} }} />
    )} />
    )
}