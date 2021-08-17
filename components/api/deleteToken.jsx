export const deleteToken = async () => {
  console.log("xxxxxxxx");
  const url = `http://localhost:3002/user/logout`;
  const options = {
    methode: "GET",
    mode: "cors",
    credentials: "include",
  };
  const result = await fetch(url, options);
  const data = await result.json();
  return data;
};
