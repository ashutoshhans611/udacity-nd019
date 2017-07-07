import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class SearchBook extends React.Component {
  state = {
    books: [],
    query: "",
    error: ""
  };

  static propTypes = {
    bookshelfs: PropTypes.object.isRequired,
    onBookUpdate: PropTypes.func.isRequired
  };

  searchBook(query = "") {
    if (query !== "") {
      BooksAPI.search(query)
        .then(books => {
          if (books.error) {
            this.setState({ books: [], error: books.error });
          } else {
            this.setState({ books, error: "" });
          }
        })
        .catch(err => {
          this.setState({ error: err.error, books: [] });
        });
    } else {
      this.setState({ books: [], error: "" });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.query !== this.state.query) {
      this.searchBook(nextState.query);
    }
  }

  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  clearQuery = () => {
    this.setState({ query: "" });
  };

  render() {
    const { bookshelfs, onBookUpdate } = this.props;
    const { books, query, error } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {error &&
            <div className="error">
              {error}
            </div>}
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map(book =>
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
      </div>
    );
  }
}

export default SearchBook;
