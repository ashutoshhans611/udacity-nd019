const api = "http://localhost:5001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token
};

export const fetchCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const fetchAllPosts = () =>
  fetch(`${api}/posts`, { headers }).then(res => res.json());

export const fetchPosts = category =>
  fetch(`${api}/${category}/posts`, { headers }).then(res => res.json());

export const fetchPost = id =>
  fetch(`${api}/posts/${id}`, { headers }).then(res => res.json());

export const createPost = post =>
  fetch(`${api}/posts`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  }).then(res => res.json());

export const editPost = post =>
  fetch(`${api}/posts/${post.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  }).then(res => res.json());

export const deletePost = postId =>
  fetch(`${api}/posts/${postId}`, {
    method: "DELETE",
    headers
    //}).then(res => res.json());
  }).then(res => true);

export const votePost = (postId, option) =>
  fetch(`${api}/posts/${postId}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option })
  }).then(res => res.json());

export const fetchComments = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers }).then(res => res.json());

export const fetchComment = id =>
  fetch(`${api}/comments/${id}`, { headers }).then(res => res.json());

export const createComment = comment =>
  fetch(`${api}/comments`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  }).then(res => res.json());

export const editComment = comment =>
  fetch(`${api}/comments/${comment.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  }).then(res => res.json());

export const deleteComment = commentId =>
  fetch(`${api}/comments/${commentId}`, {
    method: "DELETE",
    headers
  }).then(res => res);

export const voteComment = (commentId, option) =>
  fetch(`${api}/comments/${commentId}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option })
  }).then(res => res.json());
