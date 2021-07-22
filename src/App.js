import React, {useState, useEffect, useRef } from 'react';
import {  useDispatch } from 'react-redux';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ProtectedRoute} from './ProtectedRoute';
import DesktopNavigation from './components/menus/DesktopNavigation';
import HomePage from './components/pages/HomePage';
import SetUpPage from './components/pages/SetUpPage';
import Profile from './components/pages/Profile';
import DuoPage from './components/pages/DuoPage';
import { Page404 } from './components/pages/Page404';
import { io } from "socket.io-client";
import MessageSessionContainer from './components/messages/MessageSessionContainer';
import axios from 'axios';
import { decodeJWT } from './helperFuncs/cookie';
import {env_be_url} from './globalVars/envURL';

function App() {
  const [jwt, setJWT] = useState(decodeJWT(localStorage.getItem('token')));
  const socketRef = useRef();
  

  const dispatch = useDispatch();

  useEffect(() => {
    setJWT(decodeJWT(localStorage.getItem('token')))
    socketRef.current = io(`wss://lfgamer-backend.herokuapp.com/`,{
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttemps: 10,
      transports: ['websocket'],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false
    });
    dispatch({type: 'SET_SOCKET', payload: socketRef.current});
  }, [])

  // Grab logged in user information
    useEffect(() => {
      if(!jwt) return;
      axios.post(`${env_be_url}login/user`, {user_id: jwt.payload.user_id})
      .then(res => {
        dispatch({type:'SET_LOGGEDIN_USER', payload: res.data})
      })
      .catch(err => console.log(err))
    }, [jwt])

useEffect(() => {
  if(!jwt) return;
    socketRef.current.emit("addUser", jwt.payload.user_id)
    socketRef.current.on("getUsers", users => {
        console.log(users);
    })
}, [])

  return (
    <Router>
        <div className="App">
        {/* {isLoading ? <IsLoadingComponent /> : null } */}
          <DesktopNavigation />
          {/* <MobileMenu  /> */}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/duo" component={DuoPage}/>
            <ProtectedRoute  path="/profile/:id" component={Profile} />
            <ProtectedRoute exact path="/setup" component={SetUpPage} />
            <Route component={Page404} />
          </Switch>
          <MessageSessionContainer />
        </div>
    </Router>

  );
}

export default App;
