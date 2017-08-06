import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ReadableAPI from "../ReadableAPI";

class Category extends Component {
  state = {
    postOrdered: []
  };

  componentWillReceiveProps(nextProps) {
    ReadableAPI.getPosts(nextProps.match.params.categoryName)
      .then(posts => {
        if (posts.error) {
          this.setState({ postOrdered: [], error: posts.error });
        } else {
          this.setState({
            postOrdered: _.orderBy(posts, ["voteScore"], ["desc"]),
            error: ""
          });
        }
      })
      .catch(err => {
        this.setState({ postOrdered: [], error: err });
      });
  }

  componentWillUnmount() {
    this.setState({ postOrdered: [] });
  }

  changeOrder = key => {
    const postOrdered = _.orderBy(this.state.postOrdered, [key], ["desc"]);
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
          <Link to="/">All</Link>
          {_.map(categories, (category, key) =>
            <Link key={category.name} to={`/c/${category.name}`}>
              {category.name}
            </Link>
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
                <Link to={`/p/${post.id}`}>
                  {post.title}
                </Link>
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

export default Category;
