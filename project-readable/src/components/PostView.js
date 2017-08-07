import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as ReadableAPI from "../ReadableAPI";
import Timestamp from "react-timestamp";
import {
  Grid,
  Button,
  Comment,
  Form,
  Header,
  Message,
  Icon,
  Container,
  Segment,
  Menu,
  Dropdown
} from "semantic-ui-react";
import AppHeader from "./AppHeader";
import Comments from "./Comments";

class PostView extends Component {
  state = {
    postId: "",
    post: {}
  };
  componentDidMount() {
    if (this.props.match.params.postId === this.state.postId) {
      return;
    } else {
      this.setState({ postId: this.props.match.params.postId });
    }

    ReadableAPI.fetchPost(this.props.match.params.postId)
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
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.postId === this.state.postId) {
      return;
    } else {
      this.setState({ postId: nextProps.match.params.postId });
    }

    ReadableAPI.fetchPost(nextProps.match.params.postId)
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
  }

  componentWillUnmount() {
    this.setState({ postId: "" });
  }

  render() {
    const { post } = this.state;
    const { categories } = this.props;

    return (
      <div>
        <AppHeader categories={categories} />
        <Container text style={{ marginTop: "7em" }}>
          <Header as="h1">
            {post.title}
          </Header>
          <p>
            {post.body}
          </p>
        </Container>

        <Comments postId={post.id} />
      </div>
    );
  }
}

export default PostView;
