import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import S from 'styled-components';
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
  let jwt = decodeJWT(localStorage.getItem('token'));

  const dispatch = useDispatch();
  const socket = io("ws://localhost:8000");

  // client-side SOCKET
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); 
      dispatch({type: 'SET_SOCKET', payload: socket});
    });
    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
      socket.id = undefined;
    });
  }, [])

  // Grab logged in user information
    useEffect(() => {
      console.log(jwt);
      if(!jwt) return;
      axios.post(`${env_be_url}login/user`, {user_id: jwt.payload.user_id})
      .then(res => {
        dispatch({type:'SET_LOGGEDIN_USER', payload: res.data})
      })
      .catch(err => console.log(err))
    }, [jwt])

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
