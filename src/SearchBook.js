import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class SearchBook extends React.Component {
  state = {
    search_results: [],
    query: "",
    error: ""
  };

  searchBook(query = "") {
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
    const { search_results, query, error } = this.state;
    console.log(search_results);
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
          <ol className="books-grid">
            {search_results.map(book =>
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
    );
  }
}

export default SearchBook;
