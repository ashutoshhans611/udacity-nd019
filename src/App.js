import React from "react";
import { Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import SearchBook from "./SearchBook";
import ListBooks from "./ListBooks";
import "./App.css";

class BooksApp extends React.Component {
  BOOKSHELFS = {
    currentlyReading: { title: "Currently Reading", books: [] },
    wantToRead: { title: "Want to Read", books: [] },
    read: { title: "Read", books: [] }
  };

  state = { bookshelfs: this.BOOKSHELFS };

  updateBooks = books => {
    this.setState({ books });
  };

  componentDidMount() {
    let bookshelfs = this.BOOKSHELFS;

    BooksAPI.getAll()
      .then(books => {
        if (books.error) {
          this.setState({ bookshelfs: this.BOOKSHELFS, error: books.error });
        } else {
          books.map(function(book) {
            bookshelfs[book.shelf].books.push(book);
          });

          this.setState({ bookshelfs: bookshelfs, error: "" });
        }
      })
      .catch(err => {
        this.setState({ error: err.error, bookshelfs: this.BOOKSHELFS });
      });
  }

  handleSelect = (book, event) => {
    let bookshelfs = this.state.bookshelfs;

    if (Object.keys(this.BOOKSHELFS).includes(book.shelf)) {
      bookshelfs[book.shelf].books = bookshelfs[book.shelf].books.filter(b => {
        return b.id !== book.id;
      });
    }

    book.shelf = event.target.value;

    if (Object.keys(this.BOOKSHELFS).includes(event.target.value)) {
      bookshelfs[book.shelf].books.push(book);
    }
    this.setState({ bookshelfs });

    BooksAPI.update(book, event.target.value);
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() =>
            <SearchBook
              updateBooks={this.updateBooks}
              bookshelfs={this.state.bookshelfs}
              handleSelect={this.handleSelect}
            />}
        />
        <Route
          path="/"
          exact
          render={() =>
            <ListBooks
              bookshelfs={this.state.bookshelfs}
              handleSelect={this.handleSelect}
            />}
        />
      </div>
    );
  }
}

export default BooksApp;
