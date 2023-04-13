import React, { Fragment, useContext, useState } from 'react'
import { NewContext } from '../../context/Context';
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import SearchIcon from '@mui/icons-material/Search';
import "./style.css";

const Layout = () => {
  const [userName, setUserName] = useState("");
  const { state, dispatch } = useContext(NewContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (userName) {
      navigate(`/users/${userName}`);
    }
  };

  return (
    <Fragment>
      <Box component="header" style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid grey" }}>
        <ul style={{ display: "flex", gap: "20px" }}>
          <NavLink to="/favoritos">Favoritos</NavLink>
          <NavLink to="/favoritos-in-store">En Store</NavLink>
          <NavLink to="/home">Home</NavLink>
        </ul>
        <Box component="form" onSubmit={handleSearch}>
          <TextField
            placeholder='Username'
            size="small"
            name="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography variant="body2">{state.user}</Typography>
          <Box>
            <Tooltip title="Cerrar sesión">
              <IconButton onClick={() => dispatch({ type: "LOGOUT" })}>
                <ExitToAppRoundedIcon size={30} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      <Outlet />
    </Fragment>
  )
};

export default Layout;