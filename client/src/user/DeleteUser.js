import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../core/Navbar";
import { signout } from "../core/Navbar";

class DeleteUser extends Component {
  state = {
    redirect: false,
  };

  deleteAccount = () => {
    const token = isAuthenticated().token;
    const userId = this.props.userId;

    fetch(`http://localhost:8080/user/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async res => {
       return await res.json()
      })

      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          //signout user
          signout(() => console.log("User is deleted!!"));
          //redirect
          this.setState({ redirect: true });
        }
      });
  };

  deleteConfirmed = () => {
    let answer = window.confirm(
      "Are you sure you want to delete your account?"
    )
    if (answer) {
      this.deleteAccount();
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <button
        onClick={this.deleteConfirmed}
        className="btn btn-raised btn-danger"
      >
        Delete Profile
      </button>
    );
  }
}

export default DeleteUser;
