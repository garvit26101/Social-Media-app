import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { isAuthenticated } from "../core/Navbar";
import avatar from "../images/avatar.jpg";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";
import { postsByUser } from "../post/apiPost";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      following: false,
      error: "",
      posts: [],
    };
  }

  //check if follow
  checkFollow = (user) => {
    const jwt = isAuthenticated();
    const match = user.followers.find((follower) => {
      //one id has many other ids(followers) and vice versa
      return follower._id === jwt.user._id;
    });
    //return true or false
    return match;
  };

  clickFollowButton = (callFollowMethod) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    let followId = this.state.user._id;

    callFollowMethod(userId, token, followId).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        console.log(data);
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };

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
          this.setState({ user: data, following: this.checkFollow(data) });
          this.loadPosts(data._id);
        }
      });
  };

  loadPosts = (userId) => {
    const token = isAuthenticated().token;
    postsByUser(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // console.log(data)
        this.setState({ posts: data.posts });
        // console.log(this.state.posts)
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
    const { redirectToSignin, user,posts } = this.state;
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
          <div className="col-md-4">
            <img
              style={{ height: "200px", width: "auto" }}
              className="img-thumbnail"
              src={photoUrl}
              onError={(i) => (i.target.src = `${avatar}`)}
              alt={user.name}
            />
          </div>
          <div className="col-md-8">
            <div className="lead mt-2">
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{`Joined on ${new Date(user.created).toDateString()} `}</p>
            </div>

            {isAuthenticated().user &&
            isAuthenticated().user._id === user._id ? (
              <div className="d-inline-block">
                <Link
                  className="btn btn-raised btn-info mr-5"
                  to={`/post/create`}
                >
                  Create Post
                </Link>
                <Link
                  className="btn btn-raised btn-success mr-5"
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>
                <DeleteUser userId={user._id} />
              </div>
            ) : (
              <FollowProfileButton
                following={this.state.following}
                onButtonClick={this.clickFollowButton}
              />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col md-12 mt-5 mb-5">
            <hr />
            <p className="lead">{user.about}</p>
            <hr />
            <ProfileTabs
              followers={user.followers}
              following={user.following}
              posts={posts}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
