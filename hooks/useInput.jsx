import { useState } from "react";

const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (e) => {
    const { value } = { ...e.target };
    setValue(value);
  };

  return {
    value,
    onChange,
  };
};

export const genderRadio = (defaultValue) => {
  const [gender, setGender] = useState(defaultValue);
  const onChange = (e) => {
    const gender = e.target.value;
    console.log(gender);
    console.log(e.target);
    setGender(gender);
  };

  return {
    gender,
    onChange,
  };
};

export default useInput;
