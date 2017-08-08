import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Form } from "semantic-ui-react";
import { postUpdate, postSave, postDelete } from "../actions";
import PostForm from "./PostForm";
import AppHeader from "./AppHeader";

class PostEditView extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.post, (value, prop) => {
      this.props.postUpdate({ prop, value });
    });
  }

  onSaveButtonPress() {
    const { title, body, author, category } = this.props;
    this.props.postSave({
      title,
      body,
      author,
      category,
      id: this.props.post.uid
    });
  }

  onAccept() {
    const { uid } = this.props.post;
    this.props.postDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
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
              <Form.Button onPress={this.onSaveButtonPress.bind(this)}>
                Save Changes
              </Form.Button>

              <Form.Button
                onPress={() =>
                  this.setState({ showModal: !this.state.showModal })}
              >
                Delete Post
              </Form.Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ postForm }) => {
  const { name, phone, shift } = postForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  postUpdate,
  postSave,
  postDelete
})(PostEditView);
