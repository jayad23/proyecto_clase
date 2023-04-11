import { useState, useEffect } from "react";
import axios from "axios";
export const useFetch = (endpoint) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (endpoint) {
      axios
        .get(endpoint)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }
  }, [endpoint]);

  return [data];
};
