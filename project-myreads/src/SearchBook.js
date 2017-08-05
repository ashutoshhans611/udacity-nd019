import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class SearchBook extends React.Component {
  state = {
    search_results: [],
    query: "",
    error: ""
  };

  static propTypes = {
    bookshelfs: PropTypes.object.isRequired,
    onBookUpdate: PropTypes.func.isRequired
  };

  queryBooks(query = "") {
    if (query !== "") {
      BooksAPI.search(query)
        .then(search_results => {
          if (search_results.error) {
            this.setState({ search_results: [], error: search_results.error });
          } else {
            this.setState({ search_results, error: "" });
          }
        })
        .catch(err => {
          this.setState({ error: err.error, search_results: [] });
        });
    } else {
      this.setState({ search_results: [], error: "" });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.query !== this.state.query) {
      this.queryBooks(nextState.query);
    }
  }

  updateQuery = query => {
    this.setState({ query });
  };

  clearQuery = () => {
    this.setState({ query: "" });
  };

  render() {
    const { bookshelfs, books, onBookUpdate } = this.props;
    const { search_results, query, error } = this.state;
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
              {search_results.map(book =>
                <Book
                  key={book.id}
                  bookshelfs={bookshelfs}
                  book={
                    books.find(b => {
                      if (b.id === book.id) return b;
                    }) || book
                  }
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
