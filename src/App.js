import React,{useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import {ProtectedRoute} from './ProtectedRoute';
import DesktopNavigation from './components/menus/DesktopNavigation';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
// import SignupForm from './components/Forms/SignupForm/SignupForm';
// import MobileMenu from './components/Menus/MobileMenu/MobileMenu';
// import IsLoadingComponent from './components/StyledComponents/IsLoadingComponent';
// import Messages from './components/ReusedComponents/Messages.jsx';
import {setLoggedInUser} from './actions';
import S from 'styled-components';

function App() {

  // const loggedInUser = useSelector( state => state.root.loggedInUser);
  // const isLoggedIn = useSelector(state => state.root.isLoggedIn);
  // const isLoading = useSelector(state => state.root.isLoading);

  // const dispatch = useDispatch();

  // const loggedInName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
  // const loggedInUserId = loggedInUser.id;

  // this useEffect is to make sure we get the user information on Load. Probably store their loggedin email and password
  // then when the user clicks on the profilePage we use their email to get the profile information instead of
  // making a request every render.
  
  // useEffect( () => {
  //   let authToken = localStorage.getItem('auth-token'); 
	// 	const getUserInformation = () => {
	// 		axios.get(`/loggedInUser`, {  
	// 			headers: {
	// 			  'content-type': 'application/json', // Tell the server we are sending this over as JSON
	// 			  'authorization': authToken, // Send the token in the header from the client.
	// 			},
	// 		})
	// 		.then( async response => {
  //       // await dispatch(setLoggedInUser(response));
	// 		})
	// 		.catch(error => console.log(error))
  //   }
  //   if(isLoggedIn) getUserInformation();

  // },[isLoggedIn, dispatch]); 


  return (
    <Router>
        <div className="App">
        {/* {isLoading ? <IsLoadingComponent /> : null } */}
          <DesktopNavigation />
          {/* <MobileMenu  /> */}
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/* <ProtectedRoute exact path="/search" component={SearchPage} IsLoggedIn={isLoggedIn}/>
            <ProtectedRoute  path="/profile/:id" component={ProfilePage} IsLoggedIn={isLoggedIn}  />
            <ProtectedRoute  path="/inbox" component={InboxPage} IsLoggedIn={isLoggedIn}  /> */}
             <Route exact path="/login" component={LoginPage} />
           {/* <Route exact path="/signup" render={props => <SignupForm {...props}/> } />
            <Route exact path="/signup/interests" component={InterestListPage} />
            <Route exact path="/signup/add-profile"  component={ProfileCreationPage} /> */}
          </Switch>
        </div>
    </Router>

  );
}

export default App;
