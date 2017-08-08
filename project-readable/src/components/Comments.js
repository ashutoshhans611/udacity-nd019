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
  Segment
} from "semantic-ui-react";
import * as actions from "../actions";

class Comments extends Component {
  state = {
    postId: "",
    orderKey: "voteScore"
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.postId === this.state.postId) {
      return;
    } else {
      this.setState({ postId: nextProps.postId });
    }

    this.props.fetchComments(nextProps.postId);
  }

  componentWillUnmount() {
    this.setState({ postId: "" });
  }

  changeOrder = orderKey => {
    this.setState({
      orderKey
    });
  };

  onCreateButtonClick() {
    const { body, author } = this.props;
    const id = uuidv1();
    const timestamp = Date.now();
    const parentId = this.state.postId;

    this.props.commentCreate({
      id,
      timestamp,
      body,
      author,
      parentId
    });

    this.props.fetchComments(parentId);
  }

  deleteComment = id => {
    this.props.commentDelete(id);
    this.props.fetchComments(this.state.postId);
  };

  voteComment = (id, option) => {
    this.props.commentVote(id, option);
    this.props.fetchComments(this.state.postId);
  };

  render() {
    const comments = _.orderBy(
      this.props.comments,
      [this.state.orderKey],
      ["desc"]
    );

    return (
      <Segment style={{ padding: "5em 0em" }} vertical>
        <Container text>
          <Comment.Group>
            <Header as="h3" dividing>
              Comments
              <Button
                compact
                size="mini"
                onClick={() => this.changeOrder("voteScore")}
              >
                Score
                <Icon name="sort descending" />
              </Button>
              <Button
                compact
                size="mini"
                onClick={() => this.changeOrder("timestamp")}
              >
                Time
                <Icon name="sort descending" />
              </Button>
            </Header>

            {_.map(comments, (comment, key) =>
              <Comment key={comment.id}>
                <Comment.Content>
                  <Comment.Author>
                    {comment.author}
                  </Comment.Author>
                  <Comment.Metadata>
                    <span>
                      <Timestamp time={comment.timestamp / 1000} />
                    </span>
                    <Button icon compact size="mini">
                      <Icon name="edit" />
                    </Button>
                    <Button
                      icon
                      compact
                      size="mini"
                      onClick={() => this.deleteComment(comment.id)}
                    >
                      <Icon name="delete" />
                    </Button>
                  </Comment.Metadata>
                  <Comment.Text>
                    {comment.body}
                  </Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>
                      <span>
                        Score: {comment.voteScore}
                      </span>
                      <Button
                        icon
                        compact
                        size="mini"
                        onClick={() => this.voteComment(comment.id, "upVote")}
                      >
                        <Icon name="thumbs outline up" />
                      </Button>

                      <Button
                        icon
                        compact
                        size="mini"
                        onClick={() => this.voteComment(comment.id, "downVote")}
                      >
                        <Icon name="thumbs outline down" />
                      </Button>
                    </Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            )}
            <Form reply>
              <Form.Input
                label="Author"
                placeholder="author"
                value={this.props.author}
                onChange={event =>
                  this.props.commentUpdate({
                    prop: "author",
                    value: event.target.value
                  })}
              />
              <Form.TextArea
                label="Body"
                placeholder="body..."
                value={this.props.body}
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
          </Comment.Group>
        </Container>
      </Segment>
    );
  }
}

function mapStateToProps({ comments, commentForm }) {
  const { body, author } = commentForm;
  return { comments: comments.comments, body, author };
}

export default connect(mapStateToProps, actions)(Comments);
