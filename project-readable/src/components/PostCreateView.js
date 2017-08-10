import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";
import * as actions from "../actions";
import PostForm from "./PostForm";
import { Container, Form } from "semantic-ui-react";
import AppHeader from "./AppHeader";

class PostCreateView extends Component {
  onCreateButtonClick() {
    const { title, body, author, category } = this.props;
    const id = uuidv1();
    const timestamp = Date.now();
    this.props.postCreate({
      id,
      timestamp,
      title,
      body,
      author,
      category
    });
    this.props.history.push(`/p/${id}`);
    window.location.href = window.location.href;
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        <AppHeader categories={categories} />
        <Container text style={{ marginTop: "3em" }}>
          <PostForm {...this.props} />

          <Form>
            <Form.Group widths="equal">
              <Form.Button onClick={() => this.onCreateButtonClick()}>
                Create
              </Form.Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ postForm }) => {
  const { title, body, author, category } = postForm;
  return { title, body, author, category };
};

export default connect(mapStateToProps, actions)(PostCreateView);
