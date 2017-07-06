import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ListContacts extends Component {
  state = { bookshelfs: {} };

  static propTypes = {
    bookshelfs: PropTypes.object.isRequired,
    handleSelect: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ bookshelfs: nextProps.bookshelfs });
  }

  render() {
    const { handleSelect } = this.props;
    const { bookshelfs } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {_.map(
              bookshelfs,
              (bookshelf, key) =>
                bookshelf.books.length > 0 &&
                <div className="bookshelf" key={key}>
                  <h2 className="bookshelf-title">
                    {bookshelf.title}
                  </h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {bookshelf.books.map(book =>
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
                                  value={key}
                                  onChange={e => handleSelect(book, e)}
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

export default ListContacts;
