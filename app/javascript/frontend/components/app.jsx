import React from "react";
import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import NavBarContainer from './nav/navbar_container';
import MainPageContainer from './main/main_page_container';
import UserProfile from './profile/user_profile_container';
import PostForm from './posts/post_form_container';
import PostShow from './posts/post_show_container';
import PostFeed from './posts/post_feed_container';

import userLoggedIn from './test/test';

const App = () => (
  <div>
    <NavBarContainer />
    <div>
      <Switch>
        <AuthRoute exact path="/" component={MainPageContainer} />
        <ProtectedRoute exact path="/loggedInSucess" component={userLoggedIn} />
        <ProtectedRoute exact path="/feed" component={PostFeed} />
        <ProtectedRoute exact path="/users/:userId" component={UserProfile} />
        <ProtectedRoute exact path="/posts/new" component={PostForm} />
        <ProtectedRoute exact path="/posts/:postId" component={PostShow} />
      </Switch>
    </div>
  </div>
)

export default App;