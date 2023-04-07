import React, { useContext } from 'react'
import { NewContext } from '../context/Context'
import { Link } from 'react-router-dom';
import FavoriteButton from '../components/favorite-button/FavoriteButton';

const Favorites = () => {
  const { state } = useContext(NewContext);
  return (
    <main>
      <h1>Favorites</h1>
      {
        state.data.map((item) => (
          <div key={item.id}>
            <p>{item.login}</p>
            <img src={item.avatar_url} />
            <Link to={`/users/${item.login}`}>Ver mas:</Link>
            <FavoriteButton item={item} />
          </div>
        ))}
    </main>
  )
}

export default Favorites