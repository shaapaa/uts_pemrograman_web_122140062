import axios from 'axios';

const API = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 5000
});

export const fetchPosts = () =>
  API.get('/posts').then(res => res.data.posts);

export const fetchPostById = id =>
  API.get(`/posts/${id}`).then(res => res.data);

export const fetchUsers = () =>
  API.get('/users').then(res => res.data.users);

export const fetchOneComment = postId =>
  API.get('/comments', { params: { limit: 1, skip: 0 } })
     .then(res => res.data.comments.find(c => c.postId === +postId));

