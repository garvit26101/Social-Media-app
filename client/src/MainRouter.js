import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Navbar from "./core/Navbar";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import NewPost from "./post/NewPost";
import EditPost from "./post/EditPost";
import SinglePost from "./post/SinglePost";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "../src/PrivateRoute";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";

const MainRouter = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/reset-password/:resetPasswordToken"
          component={ResetPassword}
        />
        <Route path="/users" exact component={Users} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/user/:userId" exact component={Profile} />
        <PrivateRoute path="/post/edit/:postId" exact component={EditPost} />
        <PrivateRoute path="/post/create" exact component={NewPost} />
        <Route path="/post/:postId" exact component={SinglePost} />
        <PrivateRoute path="/user/edit/:userId" exact component={EditProfile} />
      </Switch>
    </div>
  );
};

export default MainRouter;
