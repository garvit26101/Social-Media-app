import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../core/Navbar";
import avatar from "../images/avatar.jpg";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      redirectToProfile: false,
      error: "",
      loading: false,
      fileSize: 0,
      about: "",
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
          this.setState({
            id: data._id,
            name: data.name,
            email: data.email,
            error: "",
            about:data.about,
          });
        }
      });
  };

  componentDidMount() {
    this.userData = new FormData();

    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  isValid = () => {
    const { name, email, password, fileSize } = this.state;

    if (fileSize > 100000) {
      this.setState({ error: "File Size should be less than 100kB",loading:false });
      return false;
    }
    if (name.length === 0) {
      this.setState({ error: "Name is required" });
      return false;
    }
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      this.setState({ error: "A valid Email is required",loading:false });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({ error: "Password must be atleast 6 characters long",loading:false });
      return false;
    }

    return true;
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });

    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = (event) => {
    event.preventDefault();

    if (this.isValid()) {
      this.setState({ loading: true, error: "" });
      // console.log(user);

      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;

      fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: this.userData,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            this.setState({ error: data.error });
          } else {
            // console.log("User data updataed : ", this.userData);
            if(typeof window !== "undefined"){
              if(localStorage.getItem("jwt")){
                let auth = JSON.parse(localStorage.getItem("jwt"));
                auth.user = data;
                localStorage.setItem("jwt", JSON.stringify(auth));
              }
            }
            this.setState({ redirectToProfile: true });
          }
        });
    }
  };

  signupForm = (name, email, password, about) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Profile photo</label>
        <input
          onChange={this.handleChange("photo")}
          accept="image/*"
          type="file"
          className="form-control"
        />
      </div>
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
        <label className="text-muted">About</label>
        <textarea
          onChange={this.handleChange("about")}
          value={about}
          type="text"
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
    const {
      id,
      name,
      email,
      password,
      about,
      redirectToProfile,
      error,
      loading,
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    const photoUrl = id
      ? `${
          process.env.REACT_APP_API_URL
        }/user/photo/${id}?${new Date().getTime()}`
      : avatar;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}

        <img
          style={{ height: "200px", width: "auto" }}
          className="img-thumbnail"
          src={photoUrl}
          onError={(i) => (i.target.src = `${avatar}`)}
          alt={name}
        />

        {this.signupForm(name, email, password, about)}
      </div>
    );
  }
}

export default EditProfile;
