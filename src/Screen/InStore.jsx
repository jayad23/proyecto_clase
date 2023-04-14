import React, { useEffect, useState, Fragment } from 'react'
import { getUsers } from '../api/firebaseMethods';
import { Box, Button, CardMedia, IconButton, Typography } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteStore from "../components/fav-in-store/FavoritesStore";

const InStore = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const results = await getUsers();
      setData(results);
    }
    fetchData()
  }, []);

  return (
    <Box component="div"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "start",
        flexWrap: "wrap",
        gap: "10px",
      }}>
      {
        data && data.map(user => (
          <FavoriteStore key={user.id} user={user} />
        ))
      }
    </Box>
  )
}

export default InStore