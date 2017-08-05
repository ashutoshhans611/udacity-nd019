import _ from "lodash";
import React, { Component } from "react";

class Root extends Component {
  render() {
    const { categories } = this.props;

    return (
      <div className="root">
        <div>
          {_.map(categories, (category, key) =>
            <div className="category" key={key}>
              <h2 className="category-name">
                {category.name}
              </h2>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Root;
