import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Timestamp from "react-timestamp";
import { Item, Header, Button, Icon } from "semantic-ui-react";
import AppHeader from "./AppHeader";

class RootView extends Component {
  state = {
    postOrdered: this.props.posts
  };

  componentWillReceiveProps(nextProps) {
    const postOrdered = _.orderBy(nextProps.posts, ["voteScore"], ["desc"]);
    this.setState({
      postOrdered
    });
  }
  changeOrder = key => {
    const postOrdered = _.orderBy(this.props.posts, [key], ["desc"]);
    this.setState({
      postOrdered
    });
  };

  render() {
    const { categories } = this.props;
    const { postOrdered } = this.state;

    return (
      <div>
        <AppHeader categories={categories} />

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
        </Header>

        <Item.Group divided>
          {_.map(postOrdered, (post, key) =>
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
      </div>
    );
  }
}

export default RootView;
