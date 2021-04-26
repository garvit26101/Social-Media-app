import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { isAuthenticated } from "../core/Navbar";
import avatar from "../images/avatar.jpg";
import DeleteUser from "./DeleteUser";

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

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, user } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;

    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : avatar;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2>
        <div className="row">
          <div className="col-md-6">
            <img
              style={{ height: "200px", width: "auto" }}
              className="img-thumbnail"
              src={photoUrl}
              onError={i => i.target.src=`${avatar}`}
              alt={user.name}
            />
          </div>
          <div className="col-md-6">
            <div className="lead mt-2">
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{`Joined on ${new Date(user.created).toDateString()} `}</p>
            </div>

            {isAuthenticated().user && isAuthenticated().user._id === user._id && (
              <div className="d-inline-block">
                <Link
                  className="btn btn-raised btn-success mr-5"
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>
                <DeleteUser userId={user._id} />
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col md-12 mt-5 mb-5">
          <hr />
            <p className="lead">{user.about}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
