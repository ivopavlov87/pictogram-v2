const csrf_token = {
    "X-CSRF-Token": document.querySelector("meta[name=csrf-token]")
      .content,
  };

export default csrf_token;