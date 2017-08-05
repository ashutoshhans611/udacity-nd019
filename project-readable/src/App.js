import React, { Component } from "react";
import { Route } from "react-router-dom";
import * as ReadableAPI from "./ReadableAPI";
import Root from "./components/Root";
import "./App.css";

class App extends Component {
  state = {
    categories: []
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
  }

  render() {
    const { categories } = this.state;
    return (
      <div className="app">
        <Route path="/" exact render={() => <Root categories={categories} />} />
      </div>
    );
  }
}

export default App;
