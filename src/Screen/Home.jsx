import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
//import { useGetData } from '../hooks/UseGetData';
import { useFetch } from '../hooks/useFetch';
import FavoriteButton from '../components/favorite-button/FavoriteButton';
export const endpoint = "https://api.github.com/users";

const toLower = (str) => {
  console.log(str)
  return str.toLowerCase();
}

const Home = () => {
  //const { values } = useGetData(endpoint);
  const [data] = useFetch(endpoint);

  return (
    <div>
      {
        data?.map((item) => (
          <div key={item.id}>
            <p>{item.login}</p>
            <img src={item.avatar_url} />
            <Link to={`/users/${item.login}`}>Ver mas:</Link>
            <FavoriteButton item={item} />
          </div>
        ))}
    </div>
  )
}

export default Home