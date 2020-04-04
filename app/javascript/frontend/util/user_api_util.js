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
    data: { user }
  })
)

export const fetchUsers = () => (
  $.ajax({
    method: `GET`,
    url: `/api/users`
  })
);