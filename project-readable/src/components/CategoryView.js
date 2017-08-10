import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Item, Header, Button, Icon } from "semantic-ui-react";
import AppHeader from "./AppHeader";
import PostItem from "./PostItem";
import * as actions from "../actions";

class CategoryView extends Component {
  componentWillMount() {
    this.props.fetchPosts(this.props.match.params.category);
  }

  componentWillUnMount() {
    this.props.changePostOrder("");
  }

  votePost = (id, option) => {
    this.props.postVote(id, option);
  };

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
              <PostItem key={post.id} post={post} votePost={this.votePost} />
            )}
          </Item.Group>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ posts, orderKey }) {
  return { posts, orderKey };
}

export default connect(mapStateToProps, actions)(CategoryView);
