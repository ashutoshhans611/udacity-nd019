import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import { postUpdate } from "../actions";

class PostForm extends Component {
  render() {
    return (
      <Form>
        <Form.Input
          label="Title"
          placeholder="title"
          value={this.props.title}
          onChange={event =>
            this.props.postUpdate({ prop: "title", value: event.target.value })}
        />
        <Form.TextArea
          label="Body"
          placeholder="body..."
          value={this.props.body}
          onChange={event =>
            this.props.postUpdate({ prop: "body", value: event.target.value })}
        />
        <Form.Input
          label="Author"
          placeholder="author"
          value={this.props.author}
          onChange={event =>
            this.props.postUpdate({
              prop: "author",
              value: event.target.value
            })}
        />
        <Form.Select
          label="Category"
          options={this.props.categories.map(c => ({
            key: c.name,
            text: c.name,
            value: c.name
          }))}
          placeholder="Category"
          value={this.props.category}
          onChange={(e, result) =>
            this.props.postUpdate({
              prop: "category",
              value: result.value
            })}
        />
      </Form>
    );
  }
}

const mapStateToProps = ({ postForm }) => {
  const { title, body, author, category } = postForm;
  return { title, body, author, category };
};

export default connect(mapStateToProps, { postUpdate })(PostForm);
