import React, { Component } from "react";
import { Route } from "react-router-dom";
import * as ReadableAPI from "./ReadableAPI";
import Root from "./components/Root";
import Category from "./components/Category";
import Post from "./components/Post";
import "./App.css";

class App extends Component {
  state = {
    categories: [],
    posts: []
  };

  componentDidMount() {
    ReadableAPI.getCategories()
      .then(categories => {
        if (categories.error) {
          this.setState({ categories: [], error: categories.error });
        } else {
          this.setState({ categories: categories, error: "" });
        }
      })
      .catch(err => {
        this.setState({ categories: [], error: err });
      });

    ReadableAPI.getAllPosts()
      .then(posts => {
        if (posts.error) {
          this.setState({ posts: [], error: posts.error });
        } else {
          this.setState({ posts: posts, error: "" });
        }
      })
      .catch(err => {
        this.setState({ posts: [], error: err });
      });
  }

  render() {
    const { categories, posts } = this.state;
    return (
      <div className="app">
        <Route
          path="/"
          exact
          render={() => <Root categories={categories} posts={posts} />}
        />
        <Route
          path="/c/:categoryName"
          render={props => <Category {...props} categories={categories} />}
        />
        <Route
          path="/p/:postId"
          render={props => <Post {...props} categories={categories} />}
        />
      </div>
    );
  }
}

export default App;
