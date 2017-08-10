import React, { Component } from "react";
import { connect } from "react-redux";
import Timestamp from "react-timestamp";
import { Item, Button, Icon } from "semantic-ui-react";
import * as actions from "../actions";

class PostItem extends Component {
  componentWillMount() {
    this.props.fetchComments(this.props.post.id);
  }

  render() {
    const { comments, post } = this.props;
    return (
      <Item key={post.id}>
        <Item.Content>
          <Item.Header as="a" href={`/${post.category}/${post.id}`}>
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
            </div>
            <div>
              Comments: {comments[post.id] ? comments[post.id].length : 0}
            </div>
            <div>
              <Button
                icon
                compact
                size="mini"
                as="a"
                href={`/${post.category}/${post.id}/edit`}
              >
                <Icon name="edit" />
              </Button>
              <Button
                icon
                compact
                size="mini"
                onClick={() => this.props.postDelete(post)}
              >
                <Icon name="delete" />
              </Button>
            </div>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

function mapStateToProps({ comments }) {
  return { comments };
}

export default connect(mapStateToProps, actions)(PostItem);
