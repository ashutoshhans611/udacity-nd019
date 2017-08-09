import _ from "lodash";
import React, { Component } from "react";

import { connect } from "react-redux";
import uuidv1 from "uuid/v1";

import Timestamp from "react-timestamp";
import {
  Button,
  Comment,
  Form,
  Header,
  Icon,
  Container,
  Segment,
  Modal
} from "semantic-ui-react";
import * as actions from "../actions";

class CommentModal extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.comment !== this.props.comment) {
      _.each(nextProps.comment, (value, prop) => {
        this.props.commentUpdate({ prop, value });
      });
    }
  }

  updateComment = () => {
    const { body, author } = this.props;
    const id = this.props.comment.id;
    const timestamp = Date.now();
    this.props.commentEdit({
      id,
      timestamp,
      body,
      author
    });
    this.props.history.push(`/p/${this.props.comment.parentId}`);
    window.location.href = window.location.href;
  };

  render() {
    const { comment } = this.props;
    return (
      <Modal
        trigger={
          <Button icon compact size="mini">
            <Icon name="edit" />
          </Button>
        }
      >
        <Modal.Header>Edit Comment</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form reply>
              <Form.Input
                label="Author"
                placeholder="author"
                value={comment.author}
                onChange={event =>
                  this.props.commentUpdate({
                    prop: "author",
                    value: event.target.value
                  })}
              />
              <Form.TextArea
                label="Body"
                placeholder="body..."
                value={comment.body}
                onChange={event =>
                  this.props.commentUpdate({
                    prop: "body",
                    value: event.target.value
                  })}
              />
              <Button
                onClick={() => this.onCreateButtonClick()}
                content="Add Comment"
                labelPosition="left"
                icon="edit"
                primary
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

function mapStateToProps({ commentForm }) {
  const { body, author } = commentForm;
  return { body, author };
}

export default connect(mapStateToProps, actions)(CommentModal);
