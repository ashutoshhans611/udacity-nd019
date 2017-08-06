import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
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

class PostView extends Component {
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
                      <div>
                        <Timestamp time={comment.timestamp / 1000} />
                      </div>
                      <div>
                        <Icon name="star" />
                        {comment.voteScore} Score
                      </div>
                    </Comment.Metadata>
                    <Comment.Text>
                      {comment.body}
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>
                        <Icon name="thumbs outline up" />
                      </Comment.Action>
                      <Comment.Action>
                        <Icon name="thumbs outline down" />
                      </Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              )}
              <Form reply>
                <Form.TextArea />
                <Button
                  content="Add Comment"
                  labelPosition="left"
                  icon="edit"
                  primary
                />
              </Form>
            </Comment.Group>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default PostView;
