import axios from "axios";

export const imageUpload = async (image) => {
  let imageURL;
  const fd = new FormData();
  fd.append("image", image);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  await axios
    .post(`http://localhost:3002/api/image`, fd, config)
    .then((res) => {
      console.log(res.data);
      imageURL = res.data;
    })
    .catch((error) => {
      console.log(error.response);
    });

  return imageURL;
};

export const joinRequest = async (data) => {
  const { userid, age, gender, image, hometown, residence, nickname } = data;
  let url = "http://localhost:3002/user";
  let options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      userid,
      age,
      gender,
      image,
      hometown,
      residence,
      nickname,
    }),
  };
  const response = await fetch(url, options);
  const result = await response.json();

  return result;
};
