import csrf_token from './csrf_token_util'

export const signup = user => (
  $.ajax({
    method: `POST`,
    url: `/api/users`,
    data: { user },
    headers: csrf_token
  })
);

export const login = user => (
  $.ajax({
    method: `POST`,
    url: `/api/session`,
    data: { user },
    headers: csrf_token
  })
);

export const logout = () => (
  $.ajax({
    method: `DELETE`,
    url: `/api/session`,
    headers: csrf_token
  })
)