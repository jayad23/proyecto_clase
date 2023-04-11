import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useGetData } from '../hooks/UseGetData';
import FavoriteButton from '../components/favorite-button/FavoriteButton';
import { TextField } from '@mui/material';
//export const endpoint = "https://api.github.com/users";
export const endpoint = "https://jsonplaceholder.typicode.com/users";

const toLower = (str) => {
  console.log(str)
  return str.toLowerCase();
}

const Home = () => {
  const { values } = useGetData(endpoint);
  const [searchValue, setSearchValue] = useState("");
  const [homeValues, setHomeValues] = useState(null);

  useEffect(() => {
    if (values) {
      setHomeValues(values);
    }
  }, [values])

  const handleSearch = (value) => {
    setSearchValue(value);
    const results = values.filter(person => person.name.replaceAll(" ", "").toLowerCase().includes(value.toLowerCase()));
    setHomeValues(results);
  };

  return (
    <div>
      <TextField
        placeholder='Username'
        size="small"
        name="Username"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {
        homeValues?.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            {/* <img src={item.avatar_url} /> */}
            <Link to={`/users/${item.login}`}>Ver mas:</Link>
            <FavoriteButton item={item} />
          </div>
        ))}
    </div>
  )
}

export default Home