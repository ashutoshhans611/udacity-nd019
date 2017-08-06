import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ReadableAPI from "../ReadableAPI";

class Post extends Component {
  state = {
    postId: "",
    post: {},
    comments: []
  };
  componentDidMount() {
    if (this.props.match.params.postId === this.state.postId) {
      return;
    } else {
      this.setState({ postId: this.props.match.params.postId });
    }

    ReadableAPI.getPost(this.props.match.params.postId)
      .then(post => {
        if (post.error) {
          this.setState({ post: {}, error: post.error });
        } else {
          this.setState({
            post: post,
            error: ""
          });
        }
      })
      .catch(err => {
        this.setState({ post: {}, error: err });
      });

    ReadableAPI.getComments(this.props.match.params.postId)
      .then(comments => {
        console.log(comments);
        if (comments.error) {
          this.setState({ comments: [], error: comments.error });
        } else {
          this.setState({
            comments: _.orderBy(comments, ["voteScore"], ["desc"]),
            error: ""
          });
        }
      })
      .catch(err => {
        this.setState({ comments: [], error: err });
      });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.postId === this.state.postId) {
      return;
    } else {
      this.setState({ postId: nextProps.match.params.postId });
    }

    ReadableAPI.getPost(nextProps.match.params.postId)
      .then(post => {
        if (post.error) {
          this.setState({ post: {}, error: post.error });
        } else {
          this.setState({
            post: post,
            error: ""
          });
        }
      })
      .catch(err => {
        this.setState({ post: {}, error: err });
      });

    ReadableAPI.getComments(nextProps.match.params.postId)
      .then(comments => {
        console.log(comments);
        if (comments.error) {
          this.setState({ comments: [], error: comments.error });
        } else {
          this.setState({
            comments: _.orderBy(comments, ["voteScore"], ["desc"]),
            error: ""
          });
        }
      })
      .catch(err => {
        this.setState({ comments: [], error: err });
      });
  }

  componentWillUnmount() {
    this.setState({ postId: "" });
  }

  changeOrder = key => {
    const comments = _.orderBy(this.state.comments, [key], ["desc"]);
    this.setState({
      comments
    });
  };

  render() {
    const { post, comments } = this.state;

    return (
      <div className="root">
        <div>
          <Link to={`/c/${post.category}`}>
            back to {post.category}
          </Link>
        </div>
        <div>
          <button onClick={() => this.changeOrder("voteScore")}>
            order by voteScore
          </button>
        </div>
        <div>
          <button onClick={() => this.changeOrder("timestamp")}>
            order by timestamp
          </button>
        </div>
        <div>
          <Link to="/new">Add New Comment</Link>
        </div>
        <div className="post">
          <h2 className="post-title">
            {post.title}
          </h2>
          <div className="post-title">
            {post.body}
          </div>
        </div>
        <div>
          {_.map(comments, (comment, key) =>
            <div className="comment" key={comment.id}>
              <h2 className="comment-title">
                {comment.title}
              </h2>
              <div className="comment-title">
                {comment.body}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Post;
