import React from "react";
import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import NavBarContainer from './nav/navbar_container';
import MainPageContainer from './main/main_page_container';
import UserProfile from './profile/user_profile_container';

import userLoggedIn from './test/test';

const App = () => (
  <div>
    <NavBarContainer />
    <div>
      <Switch>
        <AuthRoute exact path="/" component={MainPageContainer} />
        <ProtectedRoute exact path="/loggedInSucess" component={userLoggedIn} />
        <ProtectedRoute exact path="/users/:userId" component={UserProfile} />
      </Switch>
    </div>
  </div>
)

export default App;