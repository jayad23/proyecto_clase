import React from 'react'
import { Link } from 'react-router-dom';
import { useGetData } from '../hooks/UseGetData';
import FavoriteButton from '../components/favorite-button/FavoriteButton';
export const endpoint = "https://api.github.com/users";

const Home = () => {
  const { values } = useGetData(endpoint);
  return (
    <div>
      {
        values?.map((item) => (
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