export const showArticle = async (data) => {
  const { id } = data;
  const url = `http://localhost:3002/board/${id}`;
  const options = {
    methode: "GET",
    mode: "cors",
    credentials: "include",
  };
  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};

export const createArticle = async (data) => {
  const { subject, body } = data;
  let url = "http://localhost:3002/board/write";
  let options = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      subject,
      content: body,
    }),
  };

  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};

export const deleteArticle = async (data) => {
  const { id, useridx } = data;
  const url = `http://localhost:3002/board/${id}/${useridx}`;
  const options = {
    method: "delete",
    mode: "cors",
    credentials: "include",
  };
  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};

export const updateArticle = async (data) => {
  const { subject, body, id } = data;
  let url = `http://localhost:3002/board/${id}`;
  let options = {
    method: "put",
    mode: "cors",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      subject,
      content: body,
    }),
  };

  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};

const updateLike = async (data) => {
  const { isLike, board_id } = data;
  let url = "http://localhost:3002/board/like";
  let options = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      isLike,
      board_id,
    }),
  };

  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};
