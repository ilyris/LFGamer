import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ProtectedRoute} from './ProtectedRoute';
import DesktopNavigation from './components/menus/DesktopNavigation';
import HomePage from './components/pages/HomePage';
import SetUpPage from './components/pages/SetUpPage';
import Profile from './components/pages/Profile';
import { Page404 } from './components/pages/Page404';
// import MobileMenu from './components/Menus/MobileMenu/MobileMenu';
// import IsLoadingComponent from './components/StyledComponents/IsLoadingComponent';


function App() {


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
            <ProtectedRoute exact path="/setup" component={SetUpPage} />
            <Route component={Page404} />
          </Switch>
        </div>
    </Router>

  );
}

export default App;
