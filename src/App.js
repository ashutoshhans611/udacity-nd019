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
    read: { title: "Read", books: [] },
    none: { title: "None", books: [] }
  };

  state = { bookshelfs: this.BOOKSHELFS };
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

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => <SearchBook />} />
        <Route
          path="/"
          exact
          render={() => <ListBooks bookshelfs={this.state.bookshelfs} />}
        />
      </div>
    );
  }
}

export default BooksApp;
