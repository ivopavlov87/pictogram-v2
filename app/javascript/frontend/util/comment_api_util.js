import csrf_token from "./csrf_token_util";

export const createComment = comment => (
  $.ajax({
    method: `POST`,
    url: `/api/posts/${comment.post_id}/comments`,
    headers: csrf_token,
    processData: false,
    contentType: false,
    error: err => console.log(err)
  })
)

export const updateComment = comment => (
  $.ajax({
    method: `PATCH`,
    url: `/api/posts/${comment.post_id}/comments/${comment.id}`,
    data: { comment },
    headers: csrf_token,
    error: err => console.log(err)
  })
)

export const deleteComment = comment => (
  $.ajax({
    method: `DELETE`,
    url: `/api/posts/${comment.post_id}/comments/${comment.id}`,
    headers: csrf_token
  })
)