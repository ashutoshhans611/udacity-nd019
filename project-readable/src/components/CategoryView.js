import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import Timestamp from "react-timestamp";
import { Container, Item, Header, Button, Icon } from "semantic-ui-react";
import AppHeader from "./AppHeader";
import * as actions from "../actions";

class CategoryView extends Component {
  state = {
    category: "",
    orderKey: "voteScore"
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.categoryName === this.state.category) {
      return;
    } else {
      this.setState({ category: nextProps.match.params.categoryName });
    }

    this.props.fetchPosts(nextProps.match.params.categoryName);
  }

  changeOrder = orderKey => {
    this.setState({
      orderKey
    });
  };

  render() {
    const { categories } = this.props;
    const posts = _.orderBy(this.props.posts, [this.state.orderKey], ["desc"]);

    return (
      <div>
        <AppHeader categories={categories} />

        <Container text>
          <Header as="h3" dividing style={{ marginTop: "3em" }}>
            Posts
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

function mapStateToProps({ posts }) {
  return { posts: posts.posts };
}

export default connect(mapStateToProps, actions)(CategoryView);
