import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import * as ReadableAPI from "./ReadableAPI";
import RootView from "./components/RootView";
import CategoryView from "./components/CategoryView";
import PostView from "./components/PostView";
import PostCreateView from "./components/PostCreateView";
import PostEditView from "./components/PostEditView";
import * as actions from "./actions";

class App extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.props.fetchCategories();

    this.props.fetchAllPosts();
  }

  render() {
    const { categories, posts } = this.props;
    return (
      <div className="app">
        <Route
          path="/"
          exact
          render={() => <RootView categories={categories} posts={posts} />}
        />
        <Route
          path="/c/:categoryName"
          exact
          render={props => <CategoryView {...props} categories={categories} />}
        />
        <Route
          path="/p/:postId"
          exact
          render={props => <PostView {...props} categories={categories} />}
        />
        <Route
          path="/create_post"
          exact
          render={props =>
            <PostCreateView {...props} categories={categories} />}
        />
        <Route
          path="/p/:postId/edit"
          exact
          render={props => <PostEditView {...props} categories={categories} />}
        />
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return { categories: categories.categories, posts: posts.posts };
}

export default connect(mapStateToProps, actions)(App);
