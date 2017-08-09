import React, { Component } from "react";
import { connect } from "react-redux";
import Timestamp from "react-timestamp";
import { Button, Header, Icon, Container, Segment } from "semantic-ui-react";
import AppHeader from "./AppHeader";
import Comments from "./Comments";
import * as actions from "../actions";

class PostView extends Component {
  componentWillMount() {
    this.props.postFetch(this.props.match.params.postId);
  }

  deletePost = id => {
    this.props.postDelete(id);
    this.props.history.push("/");
    window.location.href = window.location.href;
  };

  votePost = (id, option) => {
    this.props.postVote(id, option);
    this.props.postFetch(id);
  };

  render() {
    const { categories, post } = this.props;

    return (
      <div>
        <AppHeader categories={categories} />
        <Container text style={{ marginTop: "7em" }}>
          <Segment vertical>
            <Header as="h2">
              {post.title}
            </Header>
          </Segment>
          <Segment vertical compact size="tiny">
            <span>
              {post.author}
            </span>
            <span>
              <Timestamp time={post.timestamp / 1000} />
            </span>
          </Segment>
          <Segment vertical size="big">
            <div>
              {post.body}
            </div>
          </Segment>
          <Segment vertical compact size="tiny">
            <span>
              Score: {post.voteScore}
            </span>
            <Button
              icon
              compact
              size="mini"
              onClick={() => this.votePost(post.id, "upVote")}
            >
              <Icon name="thumbs outline up" />
            </Button>

            <Button
              icon
              compact
              size="mini"
              onClick={() => this.votePost(post.id, "downVote")}
            >
              <Icon name="thumbs outline down" />
            </Button>

            <Button
              icon
              compact
              size="mini"
              onClick={() => this.deletePost(post.id)}
            >
              <Icon name="delete" />
            </Button>
          </Segment>
        </Container>
        <Comments postId={this.props.match.params.postId} />
      </div>
    );
  }
}

function mapStateToProps({ post }) {
  return { post };
}

export default connect(mapStateToProps, actions)(PostView);
