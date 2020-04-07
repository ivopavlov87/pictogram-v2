import csrf_token from "./csrf_token_util";

export const fetchPost = id => (
  $.ajax({
    method: `GET`,
    url: `/api/posts/${id}`
  })
)

export const fetchPosts = () => (
  $.ajax({
    method: `GET`,
    url: `/api/posts`
  })
)

export const createPost = post => (
  $.ajax({
    method: `POST`,
    url: `/api/posts`,
    data: post,
    headers: csrf_token,
    processData: false,
    contentType: false,
  })
)

export const updatePost = post => (
  $.ajax({
    method: `PATCH`,
    url: `/api/posts/${post.id}`,
    data: { post },
    headers: csrf_token
  })
)

export const deletePost = id => (
  $.ajax({
    method: `DELETE`,
    url: `/api/posts/${id}`,
    headers: csrf_token
  })
)