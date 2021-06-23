import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ProtectedRoute} from './ProtectedRoute';
import {useDispatch} from 'react-redux';
import DesktopNavigation from './components/menus/DesktopNavigation';
import HomePage from './components/pages/HomePage';
import SetUpPage from './components/pages/SetUpPage';
import Profile from './components/pages/Profile';
// import MobileMenu from './components/Menus/MobileMenu/MobileMenu';
// import IsLoadingComponent from './components/StyledComponents/IsLoadingComponent';


function App() {
  const dispatch = useDispatch();
  if(localStorage.getItem('discordUserData')) {
    dispatch({type: 'SET_DISCORD_DATA', payload: localStorage.getItem('discordUserData')})
  }

  return (
    <Router>
        <div className="App">
        {/* {isLoading ? <IsLoadingComponent /> : null } */}
          <DesktopNavigation />
          {/* <MobileMenu  /> */}
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/* <ProtectedRoute exact path="/duo" component={SearchPage} IsLoggedIn={isLoggedIn}/>*/}
            <ProtectedRoute  path="/profile/:id" component={Profile} />
            {/* <Route exact path="/login" component={LoginPage} /> */}
            <ProtectedRoute exact path="/setup" component={SetUpPage} />
           {/* <Route exact path="/signup" render={props => <SignupForm {...props}/> } />
            <Route exact path="/signup/interests" component={InterestListPage} />
            <Route exact path="/signup/add-profile"  component={ProfileCreationPage} /> */}
          </Switch>
        </div>
    </Router>

  );
}

export default App;
