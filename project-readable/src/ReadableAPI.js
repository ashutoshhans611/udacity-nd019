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

export const getPosts = category =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(posts => posts);

export const getPost = id =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(post => post);

export const getComments = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(comments => comments);
