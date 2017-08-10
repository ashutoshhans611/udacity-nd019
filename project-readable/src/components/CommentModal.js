import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Icon, Modal } from "semantic-ui-react";
import * as actions from "../actions";

class CommentModal extends Component {
  onMount = () => {
    if (this.props.comment) {
      _.each(this.props.comment, (value, prop) => {
        this.props.commentEditFormUpdate({ prop, value });
      });
    }
  };

  editComment = () => {
    const { body, author } = this.props;
    if (
      body !== this.props.comment.body ||
      author !== this.props.comment.author
    ) {
      const id = this.props.comment.id;
      const timestamp = Date.now();
      this.props.commentEdit({
        id,
        timestamp,
        body,
        author
      });
    }
    this.props.commentEditFormReset();
  };

  render() {
    const { body, author } = this.props;
    return (
      <Modal
        trigger={
          <Button icon compact size="mini">
            <Icon name="edit" />
          </Button>
        }
        onMount={this.onMount}
        onClose={this.editComment}
      >
        <Modal.Header>Edit Comment</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form reply>
              <Form.Input
                label="Author"
                placeholder="author"
                value={author}
                onChange={event =>
                  this.props.commentEditFormUpdate({
                    prop: "author",
                    value: event.target.value
                  })}
              />
              <Form.TextArea
                label="Body"
                placeholder="body..."
                value={body}
                onChange={event =>
                  this.props.commentEditFormUpdate({
                    prop: "body",
                    value: event.target.value
                  })}
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

function mapStateToProps({ commentEditForm }) {
  const { body, author } = commentEditForm;
  return { body, author };
}

export default connect(mapStateToProps, actions)(CommentModal);
