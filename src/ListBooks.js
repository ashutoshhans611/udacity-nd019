import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "./Book";

class ListBooks extends Component {
  static propTypes = {
    bookshelfs: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onBookUpdate: PropTypes.func.isRequired
  };

  render() {
    const { bookshelfs, books, onBookUpdate } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {_.map(bookshelfs, (bookshelf, key) =>
              <div className="bookshelf" key={key}>
                <h2 className="bookshelf-title">
                  {bookshelf.title}
                </h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books
                      .filter(book => book.shelf === key)
                      .map(book =>
                        <Book
                          key={book.id}
                          bookshelfs={bookshelfs}
                          book={book}
                          onBookUpdate={onBookUpdate}
                        />
                      )}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
