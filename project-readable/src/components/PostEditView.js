import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Form } from "semantic-ui-react";
import { postUpdate, postEdit, postFetch, postDelete } from "../actions";
import PostForm from "./PostForm";
import AppHeader from "./AppHeader";

class PostEditView extends Component {
  state = {
    postId: ""
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.postId !== "" &&
      nextProps.match.params.postId !== this.state.postId
    ) {
      this.setState({ postId: nextProps.match.params.postId });
      this.props.postFetch(nextProps.match.params.postId);
    }

    if (nextProps.post !== this.props.post) {
      _.each(nextProps.post, (value, prop) => {
        this.props.postUpdate({ prop, value });
      });
    }
  }

  deletePost = () => {
    this.props.postDelete(this.state.postId);
    // this.props.history.push("/");
    // window.location.href = window.location.href;
  };

  updatePost = () => {
    const { title, body, author, category } = this.props;
    const id = this.state.postId;
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

const mapStateToProps = ({ postForm, post }) => {
  const { title, body, author, category } = postForm;
  return { title, body, author, category, post };
};

export default connect(mapStateToProps, {
  postUpdate,
  postEdit,
  postFetch,
  postDelete
})(PostEditView);
