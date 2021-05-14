import React, { Component } from "react";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../core/Navbar";
import { Link } from "react-router-dom";
// import avatar from "../images/avatar.jpg";

class Comment extends Component {
  state = {
    text: "",
    error: "",
    redirectToSignin: false,
  };

  handlechange = (event) => {
    this.setState({ text: event.target.value, error: "" });
  };

  isValid = () => {
    const { text } = this.state;
    if (!text.length > 0 || text.length > 150) {
      this.setState({
        error: "Comment should not be empty or More than 150 Characters long",
      });
      return false;
    }
    return true;
  };

  addComment = (e) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      this.setState({ error: "SignIn to Comment" });
      return false;
    }

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      const postId = this.props.postId;
      // const commentToSend = { text: this.state.text };

      comment(userId, token, postId, { text: this.state.text }).then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({ text: "" });
          //dispatch array of comments to parent component(Single Post)
          this.props.updateComments(data.comments);
        }
      });
    }
  };

  deleteComment = (comment) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.props.postId;
    // const commentToSend = { text: this.state.text };

    uncomment(userId, token, postId, comment).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.props.updateComments(data.comments);
      }
    });
  };

  deleteConfirmed = (comment) => {
    let answer = window.confirm(
      "Are you sure you want to delete this Comment?"
    );
    if (answer) {
      this.deleteComment(comment);
    }
  };

  render() {
    const { comments } = this.props;
    const { error } = this.state;

    return (
      <div>
        <h2 className="mt-5">Leave a Comment</h2>

        <form onSubmit={this.addComment}>
          <div className="form-group">
            <input
              type="text"
              onChange={this.handlechange}
              className="form-control"
              value={this.state.text}
            />
            <button className="btn btn-raised btn-success mt-2">Post</button>
          </div>
        </form>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        <div className="col-md-8 col-md-offset-2">
          <h3 className="text-primary">{comments.length} Comments</h3>
          <hr />
          {comments.map((comment, i) => {
            return (
              <div key={i}>
                <Link to={`/user/${comment.postedBy._id}`}>
                  {/* <img
                    style={{ borderRadius: "50%" }}
                    className="float-left mr-2"
                    height="30px"
                    width="30px"
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                    onError={(i) => (i.target.src = `${avatar}`)}
                    alt={comment.postedBy.name}
                  /> */}
                </Link>
                <div>
                  <p>
                    {comment.text}
                    <span>
                      {isAuthenticated().user &&
                        isAuthenticated().user._id === comment.postedBy && (
                          <>
                          
                            <button
                              onClick={() => this.deleteConfirmed(comment)}
                              className="btn btn-warning btn-raised float-right"
                            >
                              Remove
                            </button>
                          </>
                        )}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Comment;
