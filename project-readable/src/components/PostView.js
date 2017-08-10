import _ from "lodash";
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

  render() {
    const { categories, posts } = this.props;
    const post = _.find(posts, p => p.id === this.props.match.params.postId);

    return (
      <div>
        <AppHeader categories={categories} />
        {(() => {
          if (post)
            return (
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
                    onClick={() => this.props.postVote(post.id, "upVote")}
                  >
                    <Icon name="thumbs outline up" />
                  </Button>

                  <Button
                    icon
                    compact
                    size="mini"
                    onClick={() => this.props.postVote(post.id, "downVote")}
                  >
                    <Icon name="thumbs outline down" />
                  </Button>
                </Segment>
                <Segment vertical>
                  <Button
                    icon
                    compact
                    size="mini"
                    as="a"
                    href={`/p/${post.id}/edit`}
                  >
                    <Icon name="edit" />
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
                <Comments postId={this.props.match.params.postId} />
              </Container>
            );
        })()}
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return { posts };
}

export default connect(mapStateToProps, actions)(PostView);
