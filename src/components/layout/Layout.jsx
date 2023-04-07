import React, { Fragment, useContext } from 'react'
import { NewContext } from '../../context/Context';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

const Layout = () => {
  const { state, dispatch } = useContext(NewContext);
  const navigate = useNavigate();

  return (
    <Fragment>
      <Box component="header" style={{ display: "flex", justifyContent: "space-between" }}>
        <ul style={{ display: "flex", gap: "20px" }}>
          <li onClick={() => navigate("/favoritos")} style={{ cursor: "pointer" }}>Favoritos</li>
          <li onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>Home</li>
        </ul>
        <Typography variant="body2">{state.user}</Typography>
        <Box>
          <Tooltip title="Cerrar sesión">
            <IconButton onClick={() => dispatch({ type: "LOGOUT" })}>
              <ExitToAppRoundedIcon size={30} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Outlet />
    </Fragment>
  )
};

export default Layout;