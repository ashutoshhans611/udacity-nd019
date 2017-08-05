import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Root extends Component {
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
      <div className="root">
        <div>
          {_.map(categories, (category, key) =>
            <div className="category" key={key}>
              {category.name}
            </div>
          )}
        </div>
        <div>
          <button onClick={() => this.changeOrder("voteScore")}>
            order by voteScore
          </button>
        </div>
        <div>
          <button onClick={() => this.changeOrder("timestamp")}>
            order by timestamp
          </button>
        </div>
        <div>
          <Link to="/new">Add New Post</Link>
        </div>
        <div>
          {_.map(postOrdered, (post, key) =>
            <div className="post" key={post.id}>
              <h2 className="post-title">
                {post.title}
              </h2>
              <div className="post-title">
                {post.body}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Root;
