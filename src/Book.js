import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
  static propTypes = {
    bookshelfs: PropTypes.object.isRequired,
    book: PropTypes.object.isRequired,
    onBookUpdate: PropTypes.func.isRequired
  };
  render() {
    const { bookshelfs, book, onBookUpdate } = this.props;

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${book.imageLinks
                  ? book.imageLinks.smallThumbnail
                  : ""}")`
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={book.shelf}
                onChange={event => onBookUpdate(book, event)}
              >
                <option value="none" disabled>
                  Move to...
                </option>
                {_.map(bookshelfs, (b, k) =>
                  <option value={k} key={k}>
                    {b.title}
                  </option>
                )}
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">
            {book.title}
          </div>
          <div className="book-authors">
            {book.authors}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
