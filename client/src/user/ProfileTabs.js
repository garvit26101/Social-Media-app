import React, { Component } from "react";
import { Link } from "react-router-dom";
import avatar from "../images/avatar.jpg";

class ProfileTabs extends Component {
  render() {
    const { following, followers, posts } = this.props;

    function getUniqueListBy(arr, key) {
      return [...new Map(arr.map((item) => [item[key], item])).values()];
    }

    //removing duplicates
    const newFollowers = getUniqueListBy(followers, "name");
    const newFollowing = getUniqueListBy(following, "name");
  

    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h3 className="text-primary">Followers</h3>
            <hr />
            {newFollowers.map((person, i) => {
              return (
                <div key={i}>
                  <Link to={`/user/${person._id}`}>
                    <img
                      style={{ borderRadius: "50%" }}
                      className="float-left mr-2"
                      height="30px"
                      width="30px"
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                      onError={(i) => (i.target.src = `${avatar}`)}
                      alt={person.name}
                    />
                    <div>
                      <p className="lead">{person.name}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="col-md-4">
            <h3 className="text-primary">Following</h3>
            <hr />
            {newFollowing.map((person, i) => {
              return (
                <div key={i}>
                  <Link to={`/user/${person._id}`}>
                    <img
                      style={{ borderRadius: "50%" }}
                      className="float-left mr-2"
                      height="30px"
                      width="30px"
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                      onError={(i) => (i.target.src = `${avatar}`)}
                      alt={person.name}
                    />
                    <div>
                      <p className="lead">{person.name}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="col-md-4">
            <h3 className="text-primary">Posts</h3>
            
            <hr />
            {posts.map((post, i) => {
              return (
                <div key={i}>
                  <Link to={`/post/${post._id}`}>
                    <div>
                      <p className="lead">{post.title}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileTabs;

