import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Navbar from "./core/Navbar";
import Signup from "./user/Signup";
import Signin from "./user/Signin";

const MainRouter = () => {
  return (
    <div>
    <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
      </Switch>
    </div>
  );
};

export default MainRouter;
