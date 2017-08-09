import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import Timestamp from "react-timestamp";
import { Container, Item, Header, Button, Icon } from "semantic-ui-react";
import AppHeader from "./AppHeader";
import PostItem from "./PostItem";
import * as actions from "../actions";

class RootView extends Component {
  componentWillMount() {
    this.props.fetchAllPosts();
  }

  componentWillUnMount() {
    this.props.changePostOrder("");
  }

  render() {
    const { categories, orderKey } = this.props;
    const posts = _.orderBy(
      this.props.posts.filter(post => !post.deleted),
      [orderKey.post],
      ["desc"]
    );

    return (
      <div>
        <AppHeader categories={categories} />

        <Container text>
          <Header as="h3" dividing style={{ marginTop: "3em" }}>
            Posts
            <Button
              compact
              size="mini"
              onClick={() => this.props.changePostOrder("voteScore")}
            >
              Score
              <Icon name="sort descending" />
            </Button>
            <Button
              compact
              size="mini"
              onClick={() => this.props.changePostOrder("timestamp")}
            >
              Time
              <Icon name="sort descending" />
            </Button>
            <Button as="a" href="/create_post">
              New Post
            </Button>
          </Header>

          <Item.Group divided>
            {_.map(posts, (post, key) =>
              <PostItem key={post.id} post={post} />
            )}
          </Item.Group>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ posts, changePostOrder, orderKey }) {
  return { posts, changePostOrder, orderKey };
}

export default connect(mapStateToProps, actions)(RootView);
