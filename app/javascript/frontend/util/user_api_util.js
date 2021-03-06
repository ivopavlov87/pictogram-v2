import csrf_token from './csrf_token_util'

export const fetchUser = id => (
  $.ajax({
    method: `GET`,
    url: `/api/users/${id}`
  })
);

export const editUser = user => (
  $.ajax({
    url: `/api/users/${user.id}`,
    method: `PATCH`,
    data: { user },
    headers: csrf_token
  })
)

export const editUserPicture = (id, data) => (
  $.ajax({
    url: `/api/users/${id}`,
    method: `PATCH`,
    data: data,
    headers: csrf_token,
    contentType: false,
    processData: false
  })
)

export const fetchUsers = () => (
  $.ajax({
    method: `GET`,
    url: `/api/users`
  })
);