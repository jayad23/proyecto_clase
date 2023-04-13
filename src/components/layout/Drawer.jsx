import React, { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { NavLink } from 'react-router-dom'
import ListRoundedIcon from '@mui/icons-material/ListRounded';

export const DesktopDrawer = () => {
  return (
    <Box component="ul" sx={{ display: { xs: "none", sm: "flex" }, gap: "20px" }}>
      <NavLink to="/favoritos">Favoritos</NavLink>
      <NavLink to="/favoritos-in-store">Favs en Firebase</NavLink>
      <NavLink to="/home">Home</NavLink>
    </Box>
  )
};

export const MobileDrawer = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Box component="div" sx={{ display: { xs: "block", sm: "none" } }}>
      <IconButton onClick={() => setShowMenu(!showMenu)}>
        <ListRoundedIcon />
      </IconButton>
      {
        showMenu && (
          <Box
            component="div"
            sx={{
              border: "1px solid grey",
              width: "130px",
              padding: "20px",
              position: "absolute",
              backgroundColor: "white",
              borderRadius: "5px"
            }}>
            <Box component="ul" sx={{ display: "flex", flexDirection: "column", margin: 0, padding: 0, gap: "10px" }}>
              <NavLink to="/favoritos">Favoritos</NavLink>
              <NavLink to="/favoritos-in-store">Favs in FB</NavLink>
              <NavLink to="/home">Home</NavLink>
            </Box>
          </Box>
        )
      }
    </Box>
  )
};