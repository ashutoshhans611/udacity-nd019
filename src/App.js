import React from "react";
import { Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import SearchBook from "./SearchBook";
import ListBooks from "./ListBooks";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    bookshelfs: {
      currentlyReading: { title: "Currently Reading" },
      wantToRead: { title: "Want to Read" },
      read: { title: "Read" }
    },
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        if (books.error) {
          this.setState({ books: [], error: books.error });
        } else {
          this.setState({ books: books, error: "" });
        }
      })
      .catch(err => {
        this.setState({ books: [], error: err });
      });
  }

  onBookUpdate = (book, event) => {
    book.shelf = event.target.value;
    let books = this.state.books.filter(b => b.id !== book.id);

    if (Object.keys(this.state.bookshelfs).includes(book.shelf))
      books.push(book);

    this.setState({ books });
    BooksAPI.update(book, event.target.value);
  };

  render() {
    const { books, bookshelfs } = this.state;
    return (
      <div className="app">
        <Route
          path="/search"
          render={() =>
            <SearchBook
              bookshelfs={bookshelfs}
              books={books}
              onBookUpdate={this.onBookUpdate}
            />}
        />
        <Route
          path="/"
          exact
          render={() =>
            <ListBooks
              bookshelfs={bookshelfs}
              books={books}
              onBookUpdate={this.onBookUpdate}
            />}
        />
      </div>
    );
  }
}

export default BooksApp;
