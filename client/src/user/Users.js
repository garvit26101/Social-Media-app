import React, { Component } from "react";
import avatar from "../images/avatar.jpg";
import {Link} from 'react-router-dom';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ users: data.users });
        //   console.log(data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { users } = this.state;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>
        <div className="row">
          {users.map((user, i) => (
            <div className="card col-md-4" key={i}>
              <img
                className="card-img-top"
                src={avatar}
                alt={user.name}
                style={{ width: "100%", height: "15vw",objectFit:"cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <Link to={`/user/${user._id}`} className="btn btn-raised btn-primary btn-sm">
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Users;
