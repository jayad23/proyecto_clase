import React, { useContext } from 'react'
import { NewContext } from '../../context/Context'
import { Box, IconButton, Tooltip } from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

const FavoriteButton = ({ item }) => {
  const { state, dispatch } = useContext(NewContext);
  const isFavorite = state.data.some(element => element.id === item.id);

  return (
    <Box>
      <Tooltip title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}>
        <IconButton onClick={() => dispatch({ type: "FAVS", payload: item })}>
          {
            isFavorite ? (
              <FavoriteRoundedIcon />
            ) : (
              <FavoriteBorderRoundedIcon />
            )
          }
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default FavoriteButton