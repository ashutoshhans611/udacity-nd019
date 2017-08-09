import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import Timestamp from "react-timestamp";
import { Container, Item, Header, Button, Icon } from "semantic-ui-react";
import AppHeader from "./AppHeader";
import * as actions from "../actions";

class CategoryView extends Component {
  componentWillMount() {
    this.props.fetchPosts(this.props.match.params.categoryName);
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
              <Item key={post.id}>
                <Item.Content>
                  <Item.Header as="a" href={`/p/${post.id}`}>
                    {post.title}
                  </Item.Header>
                  <Item.Meta>
                    {post.author}, <Timestamp time={post.timestamp / 1000} />
                  </Item.Meta>
                  <Item.Description>
                    {post.body}
                  </Item.Description>
                  <Item.Extra>
                    <div>
                      Score: {post.voteScore}
                      <Icon name="thumbs outline up" />
                      <Icon name="thumbs outline down" />
                    </div>
                  </Item.Extra>
                </Item.Content>
              </Item>
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
