import React, { useEffect, useState } from "react";
import axios from "axios";

export const useGetData = (endpoint) => {
  const [values, setValues] = useState(null);
  console.log(endpoint);
  useEffect(() => {
    console.log(endpoint);
    axios
      .get(endpoint)
      .then(({ data }) => {
        setValues(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [endpoint]);

  return {
    values,
  };
};
