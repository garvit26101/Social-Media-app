import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Navbar from "./core/Navbar";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import NewPost from "./post/NewPost";
import SinglePost from "./post/SinglePost";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "../src/PrivateRoute";

const MainRouter = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/users" exact component={Users} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/user/:userId" exact component={Profile} />
        <PrivateRoute path="/post/create" exact component={NewPost} />
        <Route path="/post/:postId" exact component={SinglePost} />
        <PrivateRoute path="/user/edit/:userId" exact component={EditProfile} />
      </Switch>
    </div>
  );
};

export default MainRouter;
