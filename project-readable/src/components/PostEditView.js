import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Form } from "semantic-ui-react";
import * as actions from "../actions";
import PostForm from "./PostForm";
import AppHeader from "./AppHeader";

class PostEditView extends Component {
  componentWillMount() {
    this.props.postFetch(this.props.match.params.postId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts !== this.props.posts) {
      const post = _.find(
        nextProps.posts,
        p => p.id === this.props.match.params.postId
      );

      _.each(post, (value, prop) => {
        this.props.postUpdate({ prop, value });
      });
    }
  }

  deletePost = () => {
    this.props.postDelete(this.props.match.params.postId);
    this.props.history.push("/");
    window.location.href = window.location.href;
  };

  updatePost = () => {
    const { title, body, author, category } = this.props;
    const id = this.props.match.params.postId;
    const timestamp = Date.now();
    this.props.postEdit({
      id,
      timestamp,
      title,
      body,
      author,
      category
    });
    this.props.history.push(`/p/${id}`);
    window.location.href = window.location.href;
  };

  render() {
    const { categories } = this.props;

    return (
      <div>
        <AppHeader categories={categories} />
        <Container text style={{ marginTop: "3em" }}>
          <PostForm {...this.props} />

          <Form>
            <Form.Group widths="equal">
              <Form.Button onClick={() => this.updatePost()}>
                Update
              </Form.Button>
              <Form.Button onClick={() => this.deletePost()}>
                Delete
              </Form.Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ postForm, posts }) => {
  const { title, body, author, category } = postForm;
  return { title, body, author, category, posts };
};

export default connect(mapStateToProps, actions)(PostEditView);
