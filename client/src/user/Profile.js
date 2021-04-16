import React, { Component } from "react";
import { Redirect,Link } from "react-router-dom";
import { isAuthenticated } from "../core/Navbar";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false,
    };
  }

  init = (userId) => {
    fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${isAuthenticated().token}`,
      },
    })
      .then((res) => {
        return res.json();
      })

      .then((data) => {
        if (data.error) {
          this.setState({ redirectToSignin: true });
        } else {
          // console.log(data);
          this.setState({ user: data });
        }
      });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  render() {
    const {redirectToSignin,user }= this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="mt-5 mb-5">Profile</h2>
            <p>{isAuthenticated().user.name}</p>
            <p>{isAuthenticated().user.email}</p>
            <p>{`Joined on ${new Date(
             user.created
            ).toDateString()} `}</p>
          </div>
          <div className="col-md-6">
            {isAuthenticated().user &&
              isAuthenticated().user._id === user._id && (
                <div className="d-inline-block mt-5">
                  <Link
                    className="btn btn-raised btn-success mr-5"
                    to={`/user/edit/${user._id}`}
                  >
                    Edit Profile
                  </Link>
                  <button className="btn btn-raised btn-danger">
                    Delete Profile
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
