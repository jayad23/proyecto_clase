import React, { Fragment, useContext, useState } from 'react'
import { NewContext } from '../../context/Context';
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import SearchIcon from '@mui/icons-material/Search';
import { DesktopDrawer, MobileDrawer } from './Drawer';
import "./style.css";
import { useLogout } from '../../hooks/useLogout';

const Layout = () => {
  const [userName, setUserName] = useState("");
  const { state } = useContext(NewContext);
  const navigate = useNavigate();
  const { handleLogOut } = useLogout();

  const handleSearch = (e) => {
    e.preventDefault();
    if (userName) {
      navigate(`/users/${userName}`);
    }
  };

  return (
    <Fragment>
      <Box component="header" style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid grey", alignItems: "center", padding: "10px" }}>
        <DesktopDrawer />
        <MobileDrawer />
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
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: "10px" }}>
          <Typography variant="body2">{state.user}</Typography>
          <Box>
            <Tooltip title="Cerrar sesión">
              <IconButton onClick={() => handleLogOut()}>
                <ExitToAppRoundedIcon size={30} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      <Box component="main" sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </Fragment>
  )
};

export default Layout;