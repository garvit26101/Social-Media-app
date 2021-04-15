import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import { isAuthenticated } from "../core/Navbar";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false,
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${isAuthenticated().token}`,
      },
    })
    .then(res => {
        return res.json()
    })
    .then((data) => {
      if (data.error) {
        this.setState({redirectToSignin:true});
      } else {
        console.log(data);
        this.setState({user:data});
      }
    });
  }

  render() {

    const redirectToSignin = this.state.redirectToSignin
    if(redirectToSignin) return <Redirect to="/signin" />

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2>
        <p>{isAuthenticated().user.name}</p>
        <p>{isAuthenticated().user.email}</p>
        <p>{`Joined on ${new Date(this.state.user.created).toDateString()} `}</p>
      </div>
    );
  }
}

export default Profile;
