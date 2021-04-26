import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Navbar from "./core/Navbar";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";

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
        <Route path="/user/edit/:userId" exact component={EditProfile} />
      </Switch>
    </div>
  );
};

export default MainRouter;
