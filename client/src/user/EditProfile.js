import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../core/Navbar";


class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      redirectToProfile: false,
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
          this.setState({ redirectToProfile: true });
        } else {
          // console.log(data);
          this.setState({ id: data._id, name: data.name, email: data.email,error:"" });
        }
      });


  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password: password || undefined
    };

    // console.log(user);
    
    const userId = this.props.match.params.userId;
    const token = isAuthenticated().token;

     fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(user),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
            if (data.error) {
              console.log(data.error);
              this.setState({error:data.error})
            } else {
                // console.log("asdadsad");
                this.setState({redirectToProfile:true})
            }
          });

  };


  signupForm = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={this.handleChange("name")}
          value={name}
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={this.handleChange("email")}
          value={email}
          type="email"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={this.handleChange("password")}
          value={password}
          type="password"
          className="form-control"
        />
      </div>
      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Update
      </button>
    </form>
  );


  render() {

    const { id, name, email, redirectToProfile } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>

        {this.signupForm(name, email)}
      </div>
    );
  }
}

export default EditProfile;
